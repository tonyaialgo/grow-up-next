import { NextRequest, NextResponse } from "next/server";
import { anonymizeForLlm } from "@/lib/ai/anonymize";
import {
  appendChatMessage,
  createChatSession,
  listSessionMessages,
  verifySession,
} from "@/lib/ai/chat-store";
import { clampOutput, clampText } from "@/lib/ai/content-filter";
import { buildConversationSummary, turnsToLlmMessages } from "@/lib/ai/conversation";
import { getLlmConfig } from "@/lib/ai/llm-config";
import { callLlm } from "@/lib/ai/llm-gateway";
import { applyTemplate, getActivePrompt } from "@/lib/ai/prompt-store";
import { checkDailyQuota, logUsage } from "@/lib/ai/quota";
import { buildAcademicRagContext } from "@/lib/ai/rag-context";
import { fetchSchoolsJsonSnapshot } from "@/lib/ai/school-snapshot";
import type { LlmMessage } from "@/lib/ai/types";

const DAILY_LIMIT = Number(process.env.AI_FREE_DAILY_LIMIT ?? "5");

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
      const ok = await verifySession(sessionId, userId, "academic_advisor");
      if (!ok) {
        return NextResponse.json({ error: "無效的對話 session" }, { status: 400 });
      }
    } else {
      sessionId = await createChatSession(userId, "academic_advisor");
    }

    const userContext = clampText(
      anonymizeForLlm(String(body.context ?? body.message ?? "")),
      3500
    );
    const schoolContext = await fetchSchoolsJsonSnapshot(100);
    const academicContext = await buildAcademicRagContext(userContext, 5000);

    const priorTurns = await listSessionMessages(sessionId);
    const conversationSummary = buildConversationSummary(priorTurns);

    const promptRow = await getActivePrompt("academic_advisor");
    const system =
      promptRow?.system_prompt ??
      "你是香港升學顧問。使用繁體中文與 Markdown。";
    const userPrompt = applyTemplate(
      promptRow?.user_template ??
        "【用戶資訊】\n{{user_context}}\n\n【學校摘要】\n{{school_context}}\n\n【升學相關摘要】\n{{academic_context}}",
      {
        user_context: userContext,
        school_context: schoolContext,
        academic_context: academicContext,
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
      temperature: 0.5,
    });

    const text = clampOutput(result.text);

    await appendChatMessage(sessionId, "user", userPrompt);
    await appendChatMessage(sessionId, "assistant", text);

    await logUsage({
      userId,
      feature: "academic_advisor",
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
