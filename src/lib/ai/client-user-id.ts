const STORAGE_KEY = "growup_user_id";

export function getOrCreateClientUserId(): string {
  if (typeof window === "undefined") return "anonymous";
  let id = localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `u_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}
