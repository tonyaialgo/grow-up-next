import { NextRequest, NextResponse } from "next/server";
import { anonymizeForLlm } from "@/lib/ai/anonymize";
import { clampOutput, clampText } from "@/lib/ai/content-filter";
import { getLlmConfig } from "@/lib/ai/llm-config";
import { callLlm } from "@/lib/ai/llm-gateway";
import { applyTemplate, getActivePrompt } from "@/lib/ai/prompt-store";
import { checkDailyQuota, logUsage } from "@/lib/ai/quota";
import { buildSiteRagContext } from "@/lib/ai/rag-context";

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

    const message = clampText(
      anonymizeForLlm(String(body.message ?? "")),
      3000
    );
    const ragContext = await buildSiteRagContext(message);

    const promptRow = await getActivePrompt("site_assistant");
    const system =
      promptRow?.system_prompt ??
      "你是 GrowUp 平台導航助手。繁體中文 Markdown。";
    const userPrompt = applyTemplate(
      promptRow?.user_template ??
        "【問題】\n{{message}}\n\n【平台內容摘要】\n{{rag_context}}",
      { message, rag_context: ragContext }
    );

    const cfg = await getLlmConfig();
    if (!cfg) {
      return NextResponse.json(
        { error: "AI 尚未設定模型配置（請管理員於後台設定）。" },
        { status: 503 }
      );
    }

    const result = await callLlm({
      provider: cfg.provider,
      model: cfg.model,
      openaiBaseUrl: cfg.openai_base_url,
      messages: [
        { role: "system", content: system },
        { role: "user", content: userPrompt },
      ],
      maxOutputTokens: 2048,
      temperature: 0.45,
    });

    const text = clampOutput(result.text);

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
