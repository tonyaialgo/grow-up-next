"use client";

import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { getOrCreateClientUserId } from "@/lib/ai/client-user-id";
import { Heart, Loader2, Send } from "lucide-react";

export default function ParentSupportPage() {
  const [message, setMessage] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const send = async () => {
    setLoading(true);
    setError("");
    setMarkdown("");
    try {
      const res = await fetch("/api/ai/parent-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: getOrCreateClientUserId(),
          message,
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
      <section className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-sm font-bold text-rose-700">
              <Heart className="h-4 w-4" />
              AI 家長支援
            </div>
            <h1 className="mb-3 text-4xl font-black text-gray-900">育兒問答 · 情緒支援</h1>
            <p className="text-lg font-medium text-gray-600">
              隨時分享你的感受或育兒困惑。若涉及緊急危機，請立即尋求專業協助。
            </p>
          </div>

          <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-xl">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              placeholder="今天想聊什麼？"
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
            <button
              type="button"
              onClick={send}
              disabled={loading || !message.trim()}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 py-4 font-black text-white shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
              送出
            </button>
            {error && (
              <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">
                {error}
              </p>
            )}
          </div>

          {markdown && (
            <div className="mt-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-lg">
              <div className="whitespace-pre-wrap font-medium leading-relaxed text-gray-800">
                {markdown}
              </div>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
