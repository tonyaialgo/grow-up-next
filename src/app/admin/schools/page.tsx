"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Search, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Dialog } from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { School, SchoolInput } from "@/types";
import { cn } from "@/lib/utils";

const EMPTY_FORM: SchoolInput = {
  name: "",
  band: null,
  type: "",
  district: "",
  level: "小學",
  features: [],
  image: null,
};

export default function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [filterBand, setFilterBand] = useState("");
  const [filterDistrict, setFilterDistrict] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingSchool, setEditingSchool] = useState<School | null>(null);
  const [form, setForm] = useState<SchoolInput>(EMPTY_FORM);
  const [formSaving, setFormSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<School | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchSchools = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/schools");
      const data = await res.json();
      setSchools(Array.isArray(data) ? data : []);
    } catch {
      setSchools([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchools();
  }, [fetchSchools]);

  // Filter schools
  const filtered = schools.filter((s) => {
    const matchSearch = !search || s.name.includes(search) || s.district.includes(search);
    const matchLevel = !filterLevel || s.level === filterLevel;
    const matchBand = !filterBand || s.band === filterBand;
    const matchDistrict = !filterDistrict || s.district === filterDistrict;
    return matchSearch && matchLevel && matchBand && matchDistrict;
  });

  const openAdd = () => {
    setEditingSchool(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setModalOpen(true);
  };

  const openEdit = (school: School) => {
    setEditingSchool(school);
    setForm({
      name: school.name,
      band: school.band,
      type: school.type,
      district: school.district,
      level: school.level,
      features: school.features || [],
      image: school.image,
    });
    setFormError("");
    setModalOpen(true);
  };

  const handleSave = async () => {
    setFormSaving(true);
    setFormError("");
    try {
      const url = editingSchool ? `/api/schools/${editingSchool.id}` : "/api/schools";
      const method = editingSchool ? "PUT" : "POST";
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
      fetchSchools();
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
      await fetch(`/api/schools/${deleteTarget.id}`, { method: "DELETE" });
      setDeleteTarget(null);
      fetchSchools();
    } finally {
      setDeleteLoading(false);
    }
  };

  // Unique districts for filter
  const districts = [...new Set(schools.map((s) => s.district).filter(Boolean))].sort();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">學校管理</h1>
          <p className="text-gray-500 mt-1">共 {schools.length} 間學校</p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="w-4 h-4" />
          新增學校
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
              placeholder="搜尋學校名稱或地區..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white"
          >
            <option value="">所有類型</option>
            <option value="小學">小學</option>
            <option value="中學">中學</option>
          </select>
          <select
            value={filterBand}
            onChange={(e) => setFilterBand(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white"
          >
            <option value="">所有Banding</option>
            <option value="Band 1">Band 1</option>
            <option value="Band 2">Band 2</option>
            <option value="Band 3">Band 3</option>
          </select>
          {districts.length > 0 && (
            <select
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white"
            >
              <option value="">所有地區</option>
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-4 font-semibold text-gray-600">學校名稱</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">Banding</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">類型</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">地區</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">階段</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">特色</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">載入中...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">暫無學校資料</td>
                </tr>
              ) : (
                filtered.map((school) => (
                  <tr key={school.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{school.name}</td>
                    <td className="px-6 py-4">
                      {school.band ? (
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-semibold",
                          school.band === "Band 1" ? "bg-primary-100 text-primary-700" :
                          school.band === "Band 2" ? "bg-accent-100 text-accent-700" :
                          "bg-gray-100 text-gray-600"
                        )}>
                          {school.band}
                        </span>
                      ) : "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{school.type || "-"}</td>
                    <td className="px-6 py-4 text-gray-600">{school.district}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-semibold",
                        school.level === "小學" ? "bg-primary-100 text-primary-700" : "bg-accent-100 text-accent-700"
                      )}>
                        {school.level}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {(school.features || []).slice(0, 2).map((f) => (
                          <span key={f} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                            {f}
                          </span>
                        ))}
                        {(school.features || []).length > 2 && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-400 rounded text-xs">
                            +{school.features.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(school)}
                          className="p-2 rounded-lg hover:bg-primary-50 text-gray-400 hover:text-primary-600 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(school)}
                          className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                        >
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
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingSchool ? "編輯學校" : "新增學校"}
        size="lg"
      >
        <div className="space-y-4">
          {formError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
              {formError}
            </div>
          )}
          <Input
            id="name"
            label="學校名稱"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="請輸入學校名稱"
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              id="level"
              label="階段"
              value={form.level || "小學"}
              onChange={(e) => setForm({ ...form, level: e.target.value as "小學" | "中學" })}
              options={[
                { value: "小學", label: "小學" },
                { value: "中學", label: "中學" },
              ]}
            />
            <Select
              id="band"
              label="Banding"
              value={form.band || ""}
              onChange={(e) => setForm({ ...form, band: (e.target.value as any) || null })}
              options={[
                { value: "", label: "請選擇" },
                { value: "Band 1", label: "Band 1" },
                { value: "Band 2", label: "Band 2" },
                { value: "Band 3", label: "Band 3" },
              ]}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="type"
              label="學校類型"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              placeholder="例如：男女校"
            />
            <Input
              id="district"
              label="地區"
              value={form.district}
              onChange={(e) => setForm({ ...form, district: e.target.value })}
              placeholder="例如：中西區"
            />
          </div>
          <Input
            id="features"
            label="特色（多個以逗號分隔）"
            value={(form.features || []).join(", ")}
            onChange={(e) =>
              setForm({
                ...form,
                features: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
              })
            }
            placeholder="例如：STEM, 英文, 體育"
          />
          <Input
            id="image"
            label="圖片 URL"
            value={form.image || ""}
            onChange={(e) => setForm({ ...form, image: e.target.value || null })}
            placeholder="https://..."
          />
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              取消
            </Button>
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
        title="刪除學校"
        message={`確定要刪除「${deleteTarget?.name}」嗎？此操作無法撤銷。`}
        confirmLabel="刪除"
        danger
      />
    </div>
  );
}
