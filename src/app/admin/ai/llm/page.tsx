"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";

type Config = {
  id: string;
  provider: "openai" | "openrouter" | "gemini" | "deepseek";
  model: string;
  openai_base_url: string | null;
  updated_at?: string;
};

type ModelRow = {
  id: string;
  name: string;
  context_length?: number | null;
};

export default function AdminLlmPage() {
  const [cfg, setCfg] = useState<Config | null>(null);
  const [provider, setProvider] = useState<Config["provider"]>("openrouter");
  const [model, setModel] = useState("");
  const [openaiBaseUrl, setOpenaiBaseUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const [orModels, setOrModels] = useState<ModelRow[]>([]);
  const [orLoading, setOrLoading] = useState(false);
  const [orError, setOrError] = useState("");
  const [orFilter, setOrFilter] = useState("");
  const [useCustomOrModel, setUseCustomOrModel] = useState(false);

  const [dsModels, setDsModels] = useState<ModelRow[]>([]);
  const [dsLoading, setDsLoading] = useState(false);
  const [dsError, setDsError] = useState("");
  const [dsFilter, setDsFilter] = useState("");
  const [useCustomDsModel, setUseCustomDsModel] = useState(false);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("admin_token")
      : null;

  const loadConfig = useCallback(async () => {
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
  }, [token]);

  const fetchOpenRouterModels = useCallback(async () => {
    setOrLoading(true);
    setOrError("");
    try {
      const res = await fetch("/api/admin/ai/openrouter-models", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        setOrError(data.error || "無法載入模型列表");
        setOrModels([]);
        return;
      }
      const list = Array.isArray(data.models) ? data.models : [];
      setOrModels(list);
      if (list.length === 0 && data.error) {
        setOrError(data.error);
      }
    } catch {
      setOrError("網絡錯誤");
      setOrModels([]);
    } finally {
      setOrLoading(false);
    }
  }, [token]);

  const fetchDeepSeekModels = useCallback(async () => {
    setDsLoading(true);
    setDsError("");
    try {
      const res = await fetch("/api/admin/ai/deepseek-models", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        setDsError(data.error || "無法載入 DeepSeek 模型列表");
        setDsModels([]);
        return;
      }
      const list = (Array.isArray(data.models) ? data.models : []).map(
        (m: { id: string; name?: string }) => ({
          id: m.id,
          name: m.name || m.id,
          context_length: null as number | null,
        })
      );
      setDsModels(list);
      if (list.length === 0 && data.error) {
        setDsError(data.error);
      }
    } catch {
      setDsError("網絡錯誤");
      setDsModels([]);
    } finally {
      setDsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  useEffect(() => {
    if (provider === "openrouter") {
      fetchOpenRouterModels();
    }
    if (provider === "deepseek") {
      fetchDeepSeekModels();
    }
  }, [provider, fetchOpenRouterModels, fetchDeepSeekModels]);

  const filteredOrModels = useMemo(() => {
    const q = orFilter.trim().toLowerCase();
    if (!q) return orModels;
    return orModels.filter(
      (m) =>
        m.id.toLowerCase().includes(q) || m.name.toLowerCase().includes(q)
    );
  }, [orModels, orFilter]);

  const selectOrModels = useMemo(() => {
    const id = model.trim();
    if (!id) return filteredOrModels;
    const inFiltered = filteredOrModels.some((m) => m.id === id);
    if (inFiltered) return filteredOrModels;
    const full = orModels.find((m) => m.id === id);
    if (full) return [full, ...filteredOrModels];
    return [
      { id, name: id, context_length: null as number | null },
      ...filteredOrModels,
    ];
  }, [filteredOrModels, orModels, model]);

  const currentModelInOrList = useMemo(
    () => orModels.some((m) => m.id === model),
    [orModels, model]
  );

  const filteredDsModels = useMemo(() => {
    const q = dsFilter.trim().toLowerCase();
    if (!q) return dsModels;
    return dsModels.filter(
      (m) =>
        m.id.toLowerCase().includes(q) || m.name.toLowerCase().includes(q)
    );
  }, [dsModels, dsFilter]);

  const selectDsModels = useMemo(() => {
    const id = model.trim();
    if (!id) return filteredDsModels;
    const inFiltered = filteredDsModels.some((m) => m.id === id);
    if (inFiltered) return filteredDsModels;
    const full = dsModels.find((m) => m.id === id);
    if (full) return [full, ...filteredDsModels];
    return [
      { id, name: id, context_length: null as number | null },
      ...filteredDsModels,
    ];
  }, [filteredDsModels, dsModels, model]);

  const currentModelInDsList = useMemo(
    () => dsModels.some((m) => m.id === model),
    [dsModels, model]
  );

  useEffect(() => {
    if (provider !== "openrouter") return;
    if (useCustomOrModel) return;
    if (orLoading) return;
    if (orModels.length > 0 && model.trim() && !currentModelInOrList) {
      setUseCustomOrModel(true);
    }
  }, [
    provider,
    useCustomOrModel,
    orLoading,
    orModels,
    model,
    currentModelInOrList,
  ]);

  useEffect(() => {
    if (provider !== "deepseek") return;
    if (useCustomDsModel) return;
    if (dsLoading) return;
    if (dsModels.length > 0 && model.trim() && !currentModelInDsList) {
      setUseCustomDsModel(true);
    }
  }, [
    provider,
    useCustomDsModel,
    dsLoading,
    dsModels,
    model,
    currentModelInDsList,
  ]);

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
          GOOGLE_GENERATIVE_AI_API_KEY / DEEPSEEK_API_KEY），此處只選供應商與模型。
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold text-gray-700">
          供應商
        </label>
        <select
          value={provider}
          onChange={(e) => {
            setProvider(e.target.value as Config["provider"]);
            setMsg("");
          }}
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5"
        >
          <option value="openrouter">OpenRouter</option>
          <option value="deepseek">DeepSeek（原生 API）</option>
          <option value="openai">OpenAI 相容 API</option>
          <option value="gemini">Google Gemini（原生）</option>
        </select>

        {provider === "openrouter" && (
          <div className="mt-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="text-sm font-bold text-gray-700">
                模型（由 OpenRouter 自動載入）
              </label>
              <button
                type="button"
                onClick={() => fetchOpenRouterModels()}
                disabled={orLoading}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                {orLoading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <RefreshCw className="h-3.5 w-3.5" />
                )}
                重新載入列表
              </button>
            </div>

            {orError && (
              <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-900">
                {orError}
              </p>
            )}

            <label className="block text-xs font-medium text-gray-500">
              搜尋模型名稱或 ID
            </label>
            <input
              type="search"
              value={orFilter}
              onChange={(e) => setOrFilter(e.target.value)}
              placeholder="例如 gemini、gpt、claude…"
              className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm"
              disabled={orLoading || orModels.length === 0}
            />

            {!useCustomOrModel && orModels.length > 0 && (
              <>
                <select
                  value={
                    currentModelInOrList ||
                    selectOrModels.some((m) => m.id === model)
                      ? model
                      : ""
                  }
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 font-mono text-sm"
                >
                  <option value="">— 請選擇模型 —</option>
                  {selectOrModels.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                      {m.context_length
                        ? ` · ${Math.round(m.context_length / 1000)}k ctx`
                        : ""}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-400">
                  共 {orModels.length} 個模型
                  {orFilter.trim()
                    ? `，篩選後約 ${filteredOrModels.length} 個（已選模型仍會顯示）`
                    : ""}
                  。
                </p>
              </>
            )}

            {(useCustomOrModel || orModels.length === 0) && (
              <>
                <label className="block text-sm font-bold text-gray-700">
                  模型 ID（手動輸入）
                </label>
                <input
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 font-mono text-sm"
                  placeholder="例如 google/gemini-2.0-flash-001"
                />
                {orModels.length > 0 && (
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={!useCustomOrModel}
                      onChange={(e) => setUseCustomOrModel(!e.target.checked)}
                    />
                    改為從上方列表選擇
                  </label>
                )}
              </>
            )}
          </div>
        )}

        {provider === "deepseek" && (
          <div className="mt-4 space-y-3">
            <p className="text-xs text-gray-500">
              使用官方{" "}
              <code className="rounded bg-gray-100 px-1">https://api.deepseek.com/v1</code>
              ，與 OpenAI SDK 相容。常見模型：<code className="rounded bg-gray-100 px-1">deepseek-chat</code>、
              <code className="rounded bg-gray-100 px-1">deepseek-reasoner</code>。
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="text-sm font-bold text-gray-700">
                模型（由 DeepSeek API 自動載入）
              </label>
              <button
                type="button"
                onClick={() => fetchDeepSeekModels()}
                disabled={dsLoading}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                {dsLoading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <RefreshCw className="h-3.5 w-3.5" />
                )}
                重新載入列表
              </button>
            </div>

            {dsError && (
              <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-900">
                {dsError}
              </p>
            )}

            <label className="block text-xs font-medium text-gray-500">
              搜尋模型 ID
            </label>
            <input
              type="search"
              value={dsFilter}
              onChange={(e) => setDsFilter(e.target.value)}
              placeholder="例如 deepseek"
              className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm"
              disabled={dsLoading || dsModels.length === 0}
            />

            {!useCustomDsModel && dsModels.length > 0 && (
              <>
                <select
                  value={
                    currentModelInDsList ||
                    selectDsModels.some((m) => m.id === model)
                      ? model
                      : ""
                  }
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 font-mono text-sm"
                >
                  <option value="">— 請選擇模型 —</option>
                  {selectDsModels.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-400">
                  共 {dsModels.length} 個模型
                  {dsFilter.trim()
                    ? `，篩選後約 ${filteredDsModels.length} 個（已選仍會顯示）`
                    : ""}
                  。
                </p>
              </>
            )}

            {(useCustomDsModel || dsModels.length === 0) && (
              <>
                <label className="block text-sm font-bold text-gray-700">
                  模型 ID（手動輸入）
                </label>
                <input
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 font-mono text-sm"
                  placeholder="deepseek-chat"
                />
                {dsModels.length > 0 && (
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={!useCustomDsModel}
                      onChange={(e) => setUseCustomDsModel(!e.target.checked)}
                    />
                    改為從上方列表選擇
                  </label>
                )}
              </>
            )}
          </div>
        )}

        {provider !== "openrouter" && provider !== "deepseek" && (
          <>
            <label className="mb-2 mt-4 block text-sm font-bold text-gray-700">
              模型 ID
            </label>
            <input
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5"
              placeholder={
                provider === "gemini"
                  ? "例如 gemini-2.0-flash"
                  : "例如 gpt-4o-mini"
              }
            />
          </>
        )}

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
