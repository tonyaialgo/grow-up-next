const PREFIX = "growup_ai_session_";

export function getStoredAiSessionId(feature: string): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(PREFIX + feature);
}

export function setStoredAiSessionId(feature: string, id: string) {
  localStorage.setItem(PREFIX + feature, id);
}

export function clearStoredAiSessionId(feature: string) {
  localStorage.removeItem(PREFIX + feature);
}
