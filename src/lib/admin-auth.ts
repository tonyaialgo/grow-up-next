import { NextRequest } from "next/server";

const ADMIN_TOKEN = "growup-admin-token-2026";

export function getAdminTokenFromRequest(req: NextRequest): string | null {
  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) {
    return auth.slice(7).trim();
  }
  const cookie = req.cookies.get("admin_token")?.value;
  return cookie?.trim() || null;
}

export function isAdminRequest(req: NextRequest): boolean {
  const token = getAdminTokenFromRequest(req);
  return token === ADMIN_TOKEN;
}
