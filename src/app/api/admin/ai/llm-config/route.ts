import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/server";
import type { LlmProvider } from "@/lib/ai/types";

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "未授權" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("ai_llm_config")
    .select("id, provider, model, openai_base_url, updated_at")
    .eq("id", "default")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "未授權" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const provider = body.provider as LlmProvider;
    const model = String(body.model ?? "").trim();
    const openai_base_url = body.openai_base_url
      ? String(body.openai_base_url).trim()
      : null;

    if (!["openai", "openrouter", "gemini", "deepseek"].includes(provider)) {
      return NextResponse.json({ error: "無效的 provider" }, { status: 400 });
    }
    if (!model) {
      return NextResponse.json({ error: "請填寫 model" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("ai_llm_config")
      .upsert(
        {
          id: "default",
          provider,
          model,
          openai_base_url,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      )
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "請求格式錯誤" }, { status: 400 });
  }
}
