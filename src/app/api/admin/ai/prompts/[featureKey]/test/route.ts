import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { clampOutput } from "@/lib/ai/content-filter";
import { getLlmConfig } from "@/lib/ai/llm-config";
import { callLlm } from "@/lib/ai/llm-gateway";
import { applyTemplate, getActivePrompt } from "@/lib/ai/prompt-store";
import { buildSiteRagContext } from "@/lib/ai/rag-context";
import { fetchSchoolsJsonSnapshot } from "@/lib/ai/school-snapshot";
import type { AiFeatureKey } from "@/lib/ai/types";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ featureKey: string }> }
) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "未授權" }, { status: 401 });
  }

  const { featureKey } = await params;
  const key = featureKey as AiFeatureKey;

  try {
    const body = await req.json();
    const testInput = String(body.testInput ?? body.message ?? "測試輸入");

    const promptRow = await getActivePrompt(key);
    if (!promptRow) {
      return NextResponse.json({ error: "找不到提示詞" }, { status: 404 });
    }

    let userContent = "";

    if (key === "academic_advisor") {
      userContent = applyTemplate(promptRow.user_template, {
        user_context: testInput,
        school_context: await fetchSchoolsJsonSnapshot(30),
      });
    } else if (key === "growth_interpreter") {
      userContent = applyTemplate(promptRow.user_template, {
        payload: testInput,
      });
    } else if (key === "parent_support") {
      userContent = applyTemplate(promptRow.user_template, {
        message: testInput,
        summary: "（測試）",
      });
    } else if (key === "site_assistant") {
      userContent = applyTemplate(promptRow.user_template, {
        message: testInput,
        rag_context: await buildSiteRagContext(testInput),
      });
    } else {
      userContent = testInput;
    }

    const cfg = await getLlmConfig();
    if (!cfg) {
      return NextResponse.json(
        { error: "請先設定 LLM（ai_llm_config）" },
        { status: 503 }
      );
    }

    const result = await callLlm({
      provider: cfg.provider,
      model: cfg.model,
      openaiBaseUrl: cfg.openai_base_url,
      messages: [
        { role: "system", content: promptRow.system_prompt },
        { role: "user", content: userContent },
      ],
      maxOutputTokens: 1024,
      temperature: 0.5,
    });

    return NextResponse.json({
      markdown: clampOutput(result.text),
      provider: result.provider,
      model: result.model,
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
