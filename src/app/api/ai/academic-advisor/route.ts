import { NextRequest, NextResponse } from "next/server";
import { anonymizeForLlm } from "@/lib/ai/anonymize";
import { clampOutput, clampText } from "@/lib/ai/content-filter";
import { getLlmConfig } from "@/lib/ai/llm-config";
import { callLlm } from "@/lib/ai/llm-gateway";
import { applyTemplate, getActivePrompt } from "@/lib/ai/prompt-store";
import { checkDailyQuota, logUsage } from "@/lib/ai/quota";
import { fetchSchoolsJsonSnapshot } from "@/lib/ai/school-snapshot";

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

    const userContext = clampText(
      anonymizeForLlm(String(body.context ?? body.message ?? "")),
      3500
    );
    const schoolContext = await fetchSchoolsJsonSnapshot(100);

    const promptRow = await getActivePrompt("academic_advisor");
    const system =
      promptRow?.system_prompt ??
      "你是香港升學顧問。使用繁體中文與 Markdown。";
    const userPrompt = applyTemplate(
      promptRow?.user_template ??
        "【用戶資訊】\n{{user_context}}\n\n【學校摘要】\n{{school_context}}",
      { user_context: userContext, school_context: schoolContext }
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
      temperature: 0.5,
    });

    const text = clampOutput(result.text);

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
