import { createAdminClient } from "@/lib/supabase/server";

function scoreText(query: string, text: string): number {
  const q = query.toLowerCase().split(/\s+/).filter(Boolean);
  const t = text.toLowerCase();
  let s = 0;
  for (const w of q) {
    if (w.length < 2) continue;
    if (t.includes(w)) s += 1;
  }
  return s;
}

export async function buildSiteRagContext(
  query: string,
  maxChars: number = 6000
): Promise<string> {
  const supabase = createAdminClient();
  const chunks: { title: string; href: string; body: string }[] = [];

  const [tipsRes, guidesRes, schoolsRes] = await Promise.all([
    supabase.from("study_tips").select("title, description, items").limit(30),
    supabase.from("admissions").select("title, description, topics").limit(30),
    supabase.from("schools").select("name, district, type, level, features").limit(40),
  ]);

  if (tipsRes.data) {
    for (const row of tipsRes.data as {
      title: string;
      description: string | null;
      items: string[] | null;
    }[]) {
      const body = `${row.description ?? ""}\n${(row.items ?? []).join(" ")}`;
      chunks.push({
        title: row.title,
        href: "/academic",
        body,
      });
    }
  }

  if (guidesRes.data) {
    for (const row of guidesRes.data as {
      title: string;
      description: string | null;
      topics: string[] | null;
    }[]) {
      const body = `${row.description ?? ""}\n${(row.topics ?? []).join(" ")}`;
      chunks.push({
        title: row.title,
        href: "/academic",
        body,
      });
    }
  }

  if (schoolsRes.data) {
    for (const row of schoolsRes.data as {
      name: string;
      district: string;
      type: string;
      level: string;
      features: string[] | null;
    }[]) {
      chunks.push({
        title: row.name,
        href: "/schools",
        body: `${row.district} ${row.type} ${row.level} ${(row.features ?? []).join(" ")}`,
      });
    }
  }

  const scored = chunks
    .map((c) => ({
      ...c,
      score: scoreText(query, `${c.title} ${c.body}`),
    }))
    .sort((a, b) => b.score - a.score);

  // Static pages hints (always useful)
  const staticHints = [
    { title: "升學導航", href: "/academic", body: "學校數據庫、升學日曆、學業小貼士、升學指南" },
    { title: "學校數據庫", href: "/schools", body: "香港中小學搜尋與篩選" },
    { title: "健康中心", href: "/health", body: "兒童健康百科與資源" },
    { title: "心靈成長", href: "/wellbeing", body: "情緒與心理健康內容" },
    { title: "AI 評估", href: "/assessment", body: "成長與健康評估工具" },
  ];

  let out = "";
  for (const s of staticHints) {
    if (scoreText(query, `${s.title} ${s.body}`) > 0 || query.length < 2) {
      out += `\n- [${s.title}](${s.href}) ${s.body}`;
    }
  }

  for (const item of scored) {
    if (item.score === 0 && query.length > 2) continue;
    const line = `\n- ${item.title} (${item.href})：${item.body.slice(0, 280)}`;
    if (out.length + line.length > maxChars) break;
    out += line;
  }

  if (!out.trim()) {
    return "（暫無匹配的平台內容摘要；請引導用戶到 /academic、/schools、/health、/wellbeing、/assessment 探索。）";
  }

  return out.trim();
}
