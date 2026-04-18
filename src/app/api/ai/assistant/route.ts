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
import { buildSiteRagContext } from "@/lib/ai/rag-context";
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
      const ok = await verifySession(sessionId, userId, "site_assistant");
      if (!ok) {
        return NextResponse.json({ error: "無效的對話 session" }, { status: 400 });
      }
    } else {
      sessionId = await createChatSession(userId, "site_assistant");
    }

    const userMessage = clampText(
      anonymizeForLlm(String(body.message ?? "")),
      3000
    );
    if (!userMessage.trim()) {
      return NextResponse.json({ error: "訊息不可為空" }, { status: 400 });
    }

    const priorTurns = await listSessionMessages(sessionId);
    const conversationSummary = buildConversationSummary(priorTurns);
    const ragContext = await buildSiteRagContext(
      `${userMessage}\n${conversationSummary}`,
      6000
    );

    const promptRow = await getActivePrompt("site_assistant");
    const system =
      promptRow?.system_prompt ??
      "你是 GrowUp 平台導航助手。繁體中文 Markdown。";
    const userPrompt = applyTemplate(
      promptRow?.user_template ??
        "【問題】\n{{message}}\n\n【對話摘要】\n{{conversation_summary}}\n\n【平台內容摘要】\n{{rag_context}}",
      {
        message: userMessage,
        conversation_summary: conversationSummary || "（無）",
        rag_context: ragContext,
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

    await appendChatMessage(sessionId, "user", userMessage);
    await appendChatMessage(sessionId, "assistant", text);

    await logUsage({
      userId,
      feature: "site_assistant",
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
