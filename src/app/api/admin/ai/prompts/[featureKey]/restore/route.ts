import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ featureKey: string }> }
) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "未授權" }, { status: 401 });
  }

  const { featureKey } = await params;

  try {
    const body = await req.json();
    const versionId =
      typeof body.versionId === "string" && body.versionId.trim()
        ? body.versionId.trim()
        : null;
    if (!versionId) {
      return NextResponse.json({ error: "需要 versionId" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { data: ver, error: verErr } = await supabase
      .from("ai_prompt_versions")
      .select("feature_key, system_prompt, user_template")
      .eq("id", versionId)
      .eq("feature_key", featureKey)
      .maybeSingle();

    if (verErr || !ver) {
      return NextResponse.json({ error: "找不到該版本" }, { status: 404 });
    }

    const row = ver as {
      feature_key: string;
      system_prompt: string;
      user_template: string | null;
    };

    await supabase.from("ai_prompt_versions").insert({
      feature_key: featureKey,
      system_prompt: row.system_prompt,
      user_template: row.user_template,
      note: `還原自版本 ${versionId}`,
    });

    const { data: updated, error: updErr } = await supabase
      .from("ai_prompts")
      .update({
        system_prompt: row.system_prompt,
        user_template: row.user_template,
        updated_at: new Date().toISOString(),
      })
      .eq("feature_key", featureKey)
      .select()
      .single();

    if (updErr) {
      return NextResponse.json({ error: updErr.message }, { status: 500 });
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "請求格式錯誤" }, { status: 400 });
  }
}
