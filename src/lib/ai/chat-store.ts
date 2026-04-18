import { createAdminClient } from "@/lib/supabase/server";

export type AiChatFeature =
  | "parent_support"
  | "site_assistant"
  | "academic_advisor"
  | "growth_interpreter";

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

const MAX_MESSAGES = 40;

export async function createChatSession(
  userId: string,
  feature: AiChatFeature,
  options?: { lastGrowthPayload?: unknown }
): Promise<string> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("ai_chat_sessions")
    .insert({
      user_identifier: userId,
      feature,
      last_growth_payload:
        options?.lastGrowthPayload !== undefined
          ? (options.lastGrowthPayload as Record<string, unknown>)
          : null,
    })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "無法建立對話");
  }
  return data.id as string;
}

export async function touchSession(sessionId: string) {
  const supabase = createAdminClient();
  await supabase
    .from("ai_chat_sessions")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", sessionId);
}

export async function appendChatMessage(
  sessionId: string,
  role: "user" | "assistant",
  content: string
) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("ai_chat_messages").insert({
    session_id: sessionId,
    role,
    content,
  });
  if (error) {
    throw new Error(error.message);
  }
  await touchSession(sessionId);
}

export async function listSessionMessages(
  sessionId: string
): Promise<ChatTurn[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("ai_chat_messages")
    .select("role, content, created_at")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true })
    .limit(MAX_MESSAGES);

  if (error || !data) {
    return [];
  }
  return (data as { role: "user" | "assistant"; content: string }[]).map(
    (r) => ({
      role: r.role,
      content: r.content,
    })
  );
}

export async function verifySession(
  sessionId: string,
  userId: string,
  feature: AiChatFeature
): Promise<boolean> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("ai_chat_sessions")
    .select("id")
    .eq("id", sessionId)
    .eq("user_identifier", userId)
    .eq("feature", feature)
    .maybeSingle();

  if (error || !data) return false;
  return true;
}

export async function getSessionGrowthPayload(
  sessionId: string,
  userId: string
): Promise<unknown | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("ai_chat_sessions")
    .select("last_growth_payload")
    .eq("id", sessionId)
    .eq("user_identifier", userId)
    .maybeSingle();

  if (error || !data) return null;
  return (data as { last_growth_payload: unknown | null }).last_growth_payload;
}

export async function setSessionGrowthPayload(
  sessionId: string,
  payload: unknown
) {
  const supabase = createAdminClient();
  await supabase
    .from("ai_chat_sessions")
    .update({
      last_growth_payload: payload as Record<string, unknown>,
      updated_at: new Date().toISOString(),
    })
    .eq("id", sessionId);
}

export async function deleteChatSession(sessionId: string, userId: string) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("ai_chat_sessions")
    .delete()
    .eq("id", sessionId)
    .eq("user_identifier", userId);
  if (error) {
    throw new Error(error.message);
  }
}
