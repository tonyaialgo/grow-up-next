import { createAdminClient } from "@/lib/supabase/server";

export async function fetchSchoolsJsonSnapshot(maxRows: number = 80) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("schools")
    .select("id, name, district, type, level, band, features")
    .order("created_at", { ascending: false })
    .limit(maxRows);

  if (error || !data) {
    return "[]";
  }

  return JSON.stringify(data, null, 0);
}
