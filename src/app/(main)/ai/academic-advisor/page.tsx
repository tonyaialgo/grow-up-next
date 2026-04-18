"use client";

import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { getOrCreateClientUserId } from "@/lib/ai/client-user-id";
import { GraduationCap, Loader2, Sparkles } from "lucide-react";

export default function AcademicAdvisorPage() {
  const [context, setContext] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setMarkdown("");
    try {
      const res = await fetch("/api/ai/academic-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: getOrCreateClientUserId(),
          context,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "請求失敗");
        return;
      }
      setMarkdown(data.markdown || "");
    } catch {
      setError("網絡錯誤");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <section className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-bold text-indigo-700">
              <Sparkles className="h-4 w-4" />
              AI 升學顧問
            </div>
            <h1 className="mb-3 text-4xl font-black text-gray-900 md:text-5xl">
              個性化升學建議
            </h1>
            <p className="text-lg font-medium text-gray-600">
              請描述孩子年齡、年級、強弱項、興趣與家庭期望；AI 會結合平台學校資料生成建議。
            </p>
          </div>

          <div className="rounded-3xl border-2 border-indigo-100 bg-white p-6 shadow-xl">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              孩子與升學背景（可自由輸入）
            </label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              rows={10}
              placeholder="例如：小五男生，喜歡科學與足球，數學較弱，希望入讀 Band 2 英文中學..."
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <p className="mt-2 text-xs text-gray-500">
              免費用戶每日有 AI 次數上限。內容會經簡易匿名化後再送往模型。
            </p>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || !context.trim()}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 py-4 text-lg font-black text-white shadow-lg transition hover:opacity-95 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <GraduationCap className="h-5 w-5" />
              )}
              生成升學建議
            </button>
            {error && (
              <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">
                {error}
              </p>
            )}
          </div>

          {markdown && (
            <div className="prose prose-indigo mt-10 max-w-none rounded-3xl border border-gray-100 bg-white p-8 shadow-lg prose-headings:font-black prose-li:my-1">
              <div className="whitespace-pre-wrap font-medium text-gray-800">
                {markdown.split("\n").map((line, i) => (
                  <p key={i} className="mb-2 last:mb-0">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
