import { createAdminClient } from "@/lib/supabase/server";

function startOfUtcDay(): string {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d.toISOString();
}

export async function checkDailyQuota(
  userId: string,
  dailyLimit: number
): Promise<{ allowed: boolean; used: number }> {
  const supabase = createAdminClient();
  const { count, error } = await supabase
    .from("ai_usage_logs")
    .select("id", { count: "exact", head: true })
    .eq("user_identifier", userId)
    .gte("created_at", startOfUtcDay());

  if (error) {
    return { allowed: true, used: 0 };
  }

  const used = count ?? 0;
  return { allowed: used < dailyLimit, used };
}

export async function logUsage(params: {
  userId: string;
  feature: string;
  provider: string;
  model: string;
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
}) {
  const supabase = createAdminClient();
  await supabase.from("ai_usage_logs").insert({
    user_identifier: params.userId,
    feature: params.feature,
    provider: params.provider,
    model: params.model,
    prompt_tokens: params.promptTokens ?? null,
    completion_tokens: params.completionTokens ?? null,
    total_tokens: params.totalTokens ?? null,
  });
}
