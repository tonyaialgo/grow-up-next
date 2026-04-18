import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ featureKey: string }> }
) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "未授權" }, { status: 401 });
  }

  const { featureKey } = await params;
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("ai_prompts")
    .select("*")
    .eq("feature_key", featureKey)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "找不到提示詞" }, { status: 404 });
  }

  const { data: versions } = await supabase
    .from("ai_prompt_versions")
    .select("id, created_at, note")
    .eq("feature_key", featureKey)
    .order("created_at", { ascending: false })
    .limit(20);

  return NextResponse.json({ prompt: data, versions: versions ?? [] });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ featureKey: string }> }
) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "未授權" }, { status: 401 });
  }

  const { featureKey } = await params;

  try {
    const body = await req.json();
    const system_prompt = String(body.system_prompt ?? "");
    const user_template =
      body.user_template === undefined || body.user_template === null
        ? null
        : String(body.user_template);
    const note = body.note ? String(body.note) : null;

    if (!system_prompt.trim()) {
      return NextResponse.json({ error: "system_prompt 不可為空" }, { status: 400 });
    }

    const supabase = createAdminClient();

    await supabase.from("ai_prompt_versions").insert({
      feature_key: featureKey,
      system_prompt,
      user_template,
      note,
    });

    const { data, error } = await supabase
      .from("ai_prompts")
      .update({
        system_prompt,
        user_template,
        updated_at: new Date().toISOString(),
      })
      .eq("feature_key", featureKey)
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
