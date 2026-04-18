"use client";

import { useEffect, useState } from "react";

type Config = {
  id: string;
  provider: "openai" | "openrouter" | "gemini";
  model: string;
  openai_base_url: string | null;
  updated_at?: string;
};

export default function AdminLlmPage() {
  const [cfg, setCfg] = useState<Config | null>(null);
  const [provider, setProvider] = useState<Config["provider"]>("openrouter");
  const [model, setModel] = useState("");
  const [openaiBaseUrl, setOpenaiBaseUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("admin_token")
      : null;

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/ai/llm-config", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data) {
        setCfg(data);
        setProvider(data.provider);
        setModel(data.model);
        setOpenaiBaseUrl(data.openai_base_url || "");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async () => {
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch("/api/admin/ai/llm-config", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          provider,
          model,
          openai_base_url: openaiBaseUrl.trim() || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.error || "儲存失敗");
        return;
      }
      setCfg(data);
      setMsg("已儲存");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-gray-500">
        載入中…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">LLM 設定</h1>
        <p className="mt-1 text-sm text-gray-500">
          金鑰請用環境變數設定（OPENROUTER_API_KEY / OPENAI_API_KEY /
          GOOGLE_GENERATIVE_AI_API_KEY），此處只選供應商與模型。
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold text-gray-700">
          供應商
        </label>
        <select
          value={provider}
          onChange={(e) =>
            setProvider(e.target.value as Config["provider"])
          }
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5"
        >
          <option value="openrouter">OpenRouter</option>
          <option value="openai">OpenAI 相容 API</option>
          <option value="gemini">Google Gemini（原生）</option>
        </select>

        <label className="mb-2 mt-4 block text-sm font-bold text-gray-700">
          模型 ID
        </label>
        <input
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5"
          placeholder="例如 google/gemini-2.0-flash-001 或 gpt-4o"
        />

        {provider === "openai" && (
          <>
            <label className="mb-2 mt-4 block text-sm font-bold text-gray-700">
              OpenAI 相容 Base URL（可選）
            </label>
            <input
              value={openaiBaseUrl}
              onChange={(e) => setOpenaiBaseUrl(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5"
              placeholder="預設 https://api.openai.com/v1"
            />
          </>
        )}

        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="mt-6 w-full rounded-xl bg-primary-600 py-3 font-black text-white hover:bg-primary-700 disabled:opacity-50"
        >
          {saving ? "儲存中…" : "儲存"}
        </button>
        {msg && (
          <p className="mt-3 text-center text-sm font-medium text-emerald-600">
            {msg}
          </p>
        )}
        {cfg?.updated_at && (
          <p className="mt-2 text-center text-xs text-gray-400">
            最後更新：{cfg.updated_at}
          </p>
        )}
      </div>
    </div>
  );
}
