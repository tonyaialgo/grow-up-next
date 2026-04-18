import { NextRequest, NextResponse } from "next/server";
import { anonymizeForLlm } from "@/lib/ai/anonymize";
import {
  appendChatMessage,
  createChatSession,
  getSessionGrowthPayload,
  listSessionMessages,
  setSessionGrowthPayload,
  verifySession,
} from "@/lib/ai/chat-store";
import { clampOutput, clampText } from "@/lib/ai/content-filter";
import { buildConversationSummary, turnsToLlmMessages } from "@/lib/ai/conversation";
import { getLlmConfig } from "@/lib/ai/llm-config";
import { callLlm } from "@/lib/ai/llm-gateway";
import { applyTemplate, getActivePrompt } from "@/lib/ai/prompt-store";
import { checkDailyQuota, logUsage } from "@/lib/ai/quota";
import { buildWellbeingRagContext } from "@/lib/ai/rag-context";
import type { LlmMessage } from "@/lib/ai/types";

const DAILY_LIMIT = Number(process.env.AI_FREE_DAILY_LIMIT ?? "5");

function mergePayload(base: unknown, patch: unknown): unknown {
  if (base && typeof base === "object" && patch && typeof patch === "object") {
    return { ...(base as Record<string, unknown>), ...(patch as Record<string, unknown>) };
  }
  return patch ?? base;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId =
      typeof body.userId === "string" && body.userId.trim()
        ? body.userId.trim()
        : "anonymous";

    const quota = await checkDailyQuota(userId, DAILY_LIMIT);
    if (!quota.allowed) {
      return NextResponse.json(
        {
          error: "今日 AI 使用次數已達上限，請明日再試或升級方案。",
          used: quota.used,
        },
        { status: 429 }
      );
    }

    let sessionId =
      typeof body.sessionId === "string" && body.sessionId.trim()
        ? body.sessionId.trim()
        : null;
    if (sessionId) {
      const ok = await verifySession(sessionId, userId, "growth_interpreter");
      if (!ok) {
        return NextResponse.json({ error: "無效的對話 session" }, { status: 400 });
      }
    }

    let payloadObj: unknown;
    if (sessionId) {
      const stored = await getSessionGrowthPayload(sessionId, userId);
      if (body.payload !== undefined && body.payload !== null) {
        payloadObj = mergePayload(stored, body.payload);
      } else if (stored) {
        payloadObj = stored;
      } else {
        payloadObj = body.payload ?? {};
      }
      const followUp = String(body.message ?? body.followUp ?? "").trim();
      if (followUp) {
        payloadObj = mergePayload(payloadObj, {
          follow_up_question: followUp,
          note: "使用者追問（可結合先前數據回答）",
        });
      }
    } else {
      if (body.payload === undefined || body.payload === null) {
        return NextResponse.json(
          { error: "首次解讀需要附上評估數據（payload）。" },
          { status: 400 }
        );
      }
      payloadObj = body.payload;
    }

    const payloadRaw = JSON.stringify(payloadObj, null, 2);
    const payload = clampText(anonymizeForLlm(payloadRaw), 4000);

    if (!sessionId) {
      sessionId = await createChatSession(userId, "growth_interpreter", {
        lastGrowthPayload: payloadObj,
      });
    }

    const priorTurns = await listSessionMessages(sessionId);
    const conversationSummary = buildConversationSummary(priorTurns);
    const ragContext = await buildWellbeingRagContext(
      `${payload.slice(0, 500)} ${conversationSummary}`,
      5000
    );

    const promptRow = await getActivePrompt("growth_interpreter");
    const system =
      promptRow?.system_prompt ??
      "你是兒童成長健康助理。繁體中文 Markdown。不可取代醫生。";
    const userPrompt = applyTemplate(
      promptRow?.user_template ?? "【數據】\n{{payload}}\n\n【摘要】\n{{rag_context}}",
      {
        payload,
        rag_context: ragContext,
        conversation_summary: conversationSummary,
      }
    );

    const cfg = await getLlmConfig();
    if (!cfg) {
      return NextResponse.json(
        { error: "AI 尚未設定模型配置（請管理員於後台設定）。" },
        { status: 503 }
      );
    }

    const chatMessages = turnsToLlmMessages(priorTurns, userPrompt);
    const messages: LlmMessage[] = [
      { role: "system", content: system },
      ...chatMessages,
    ];

    const result = await callLlm({
      provider: cfg.provider,
      model: cfg.model,
      openaiBaseUrl: cfg.openai_base_url,
      messages,
      maxOutputTokens: 2048,
      temperature: 0.45,
    });

    const text = clampOutput(result.text);

    await setSessionGrowthPayload(sessionId, payloadObj);
    await appendChatMessage(sessionId, "user", userPrompt);
    await appendChatMessage(sessionId, "assistant", text);

    await logUsage({
      userId,
      feature: "growth_interpreter",
      provider: result.provider,
      model: result.model,
      promptTokens: result.promptTokens,
      completionTokens: result.completionTokens,
      totalTokens: result.totalTokens,
    });

    return NextResponse.json({
      markdown: text,
      sessionId,
      usage: {
        promptTokens: result.promptTokens,
        completionTokens: result.completionTokens,
        totalTokens: result.totalTokens,
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "未知錯誤";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
