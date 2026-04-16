"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Dialog } from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { Admission, AdmissionInput } from "@/types";
import { cn } from "@/lib/utils";

const EMPTY_FORM: AdmissionInput = {
  title: "",
  description: null,
  level: null,
  icon: "BookOpen",
  color: "primary",
  topics: [],
};

export default function GuidesPage() {
  const [guides, setGuides] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Admission | null>(null);
  const [form, setForm] = useState<AdmissionInput>(EMPTY_FORM);
  const [formSaving, setFormSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<Admission | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchGuides = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/guides");
      const data = await res.json();
      setGuides(Array.isArray(data) ? data : []);
    } catch {
      setGuides([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGuides();
  }, [fetchGuides]);

  const filtered = guides.filter((g) => {
    const matchSearch = !search || g.title.includes(search);
    const matchLevel = !filterLevel || g.level === filterLevel;
    return matchSearch && matchLevel;
  });

  const levelLabel = (level: string | null) => {
    if (!level) return "-";
    if (level === "ALL") return "全部";
    if (level === "P") return "小學";
    if (level === "S") return "中學";
    return level;
  };

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setModalOpen(true);
  };

  const openEdit = (guide: Admission) => {
    setEditing(guide);
    setForm({
      title: guide.title,
      description: guide.description,
      level: guide.level,
      icon: guide.icon || "BookOpen",
      color: guide.color || "primary",
      topics: guide.topics || [],
    });
    setFormError("");
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title) {
      setFormError("請填寫標題");
      return;
    }
    setFormSaving(true);
    setFormError("");
    try {
      const url = editing ? `/api/guides/${editing.id}` : "/api/guides";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "儲存失敗");
        return;
      }
      setModalOpen(false);
      fetchGuides();
    } catch {
      setFormError("網絡錯誤");
    } finally {
      setFormSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await fetch(`/api/guides/${deleteTarget.id}`, { method: "DELETE" });
      setDeleteTarget(null);
      fetchGuides();
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">升學指南</h1>
          <p className="text-gray-500 mt-1">共 {guides.length} 項指南</p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="w-4 h-4" />
          新增指南
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜尋標題..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white"
          >
            <option value="">所有階段</option>
            <option value="ALL">全部</option>
            <option value="P">小學</option>
            <option value="S">中學</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-4 font-semibold text-gray-600">標題</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">階段</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">主題</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-gray-400">載入中...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-gray-400">暫無指南資料</td>
                </tr>
              ) : (
                filtered.map((guide) => (
                  <tr key={guide.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{guide.title}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-semibold",
                        guide.level === "ALL" ? "bg-primary-100 text-primary-700" :
                        guide.level === "P" ? "bg-accent-100 text-accent-700" :
                        guide.level === "S" ? "bg-gray-100 text-gray-600" :
                        "bg-gray-100 text-gray-400"
                      )}>
                        {levelLabel(guide.level)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {(guide.topics || []).slice(0, 2).map((t) => (
                          <span key={t} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                            {t}
                          </span>
                        ))}
                        {(guide.topics || []).length > 2 && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-400 rounded text-xs">
                            +{guide.topics.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(guide)} className="p-2 rounded-lg hover:bg-primary-50 text-gray-400 hover:text-primary-600 transition-colors">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteTarget(guide)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "編輯指南" : "新增指南"} size="md">
        <div className="space-y-4">
          {formError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
              {formError}
            </div>
          )}
          <Input
            id="title"
            label="標題"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="請輸入指南標題"
          />
          <Select
            id="level"
            label="適用階段"
            value={form.level || ""}
            onChange={(e) => setForm({ ...form, level: (e.target.value as any) || null })}
            options={[
              { value: "", label: "請選擇" },
              { value: "ALL", label: "全部" },
              { value: "P", label: "小學" },
              { value: "S", label: "中學" },
            ]}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">描述</label>
            <textarea
              value={form.description || ""}
              onChange={(e) => setForm({ ...form, description: e.target.value || null })}
              placeholder="請輸入描述..."
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all resize-none"
            />
          </div>
          <Input
            id="topics"
            label="主題（多個以逗號分隔）"
            value={(form.topics || []).join(", ")}
            onChange={(e) =>
              setForm({ ...form, topics: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })
            }
            placeholder="例如：自行分配, 叩門, 面試準備"
          />
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>取消</Button>
            <Button onClick={handleSave} disabled={formSaving}>
              {formSaving ? "儲存中..." : "儲存"}
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="刪除指南"
        message={`確定要刪除「${deleteTarget?.title}」嗎？此操作無法撤銷。`}
        confirmLabel="刪除"
        danger
      />
    </div>
  );
}
