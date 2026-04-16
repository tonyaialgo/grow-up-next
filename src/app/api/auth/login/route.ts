import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

// Simple token-based auth for MVP
const ADMIN_EMAIL = "admin@growup.hk";
const ADMIN_PASSWORD = "GrowUp2026!";
const ADMIN_TOKEN = "growup-admin-token-2026";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return NextResponse.json({ token: ADMIN_TOKEN, name: "Admin" });
    }

    // Fallback: check database
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("admins")
      .select("*")
      .eq("email", email)
      .single();

    if (data) {
      // Simple password check (in production use bcrypt)
      if (data.password === password) {
        return NextResponse.json({ token: ADMIN_TOKEN, name: data.name });
      }
    }

    return NextResponse.json({ error: "電郵或密碼錯誤" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "伺服器錯誤" }, { status: 500 });
  }
}
