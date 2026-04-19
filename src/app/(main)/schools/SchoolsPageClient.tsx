"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Filter, GraduationCap, MapPin, Search } from "lucide-react";
import type { SchoolCardData } from "./school-card-data";
import {
  BANDINGS,
  DISTRICTS,
  GENDERS,
  SCHOOL_TYPES,
} from "./school-card-data";

function getBandingColor(banding: string) {
  if (banding === "Banding 1") return "bg-yellow-100 text-yellow-700";
  if (banding === "Banding 2") return "bg-blue-100 text-blue-700";
  return "bg-gray-100 text-gray-600";
}

function getTypeColor(type: string) {
  if (type === "官立") return "bg-purple-100 text-purple-700";
  if (type === "資助") return "bg-indigo-100 text-indigo-700";
  if (type === "直資") return "bg-pink-100 text-pink-700";
  if (type === "私立") return "bg-orange-100 text-orange-700";
  return "bg-cyan-100 text-cyan-700";
}

export default function SchoolsPageClient({
  initialSchools,
}: {
  initialSchools: SchoolCardData[];
}) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("全部");
  const [districtFilter, setDistrictFilter] = useState("全部");
  const [bandingFilter, setBandingFilter] = useState("全部");
  const [genderFilter, setGenderFilter] = useState("全部");
  const [showFilters, setShowFilters] = useState(false);

  const filteredSchools = useMemo(() => {
    return initialSchools.filter((school) => {
      const normalizedSearch = search.toLowerCase();
      const matchesSearch =
        school.name.toLowerCase().includes(normalizedSearch) ||
        school.name_en.toLowerCase().includes(normalizedSearch) ||
        school.district.toLowerCase().includes(normalizedSearch);
      const matchesType = typeFilter === "全部" || school.type === typeFilter;
      const matchesDistrict =
        districtFilter === "全部" || school.district === districtFilter;
      const matchesBanding =
        bandingFilter === "全部" || school.banding === bandingFilter;
      const matchesGender =
        genderFilter === "全部" || school.gender === genderFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesDistrict &&
        matchesBanding &&
        matchesGender
      );
    });
  }, [
    bandingFilter,
    districtFilter,
    genderFilter,
    initialSchools,
    search,
    typeFilter,
  ]);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-600">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-yellow-300/20 blur-3xl" />
          <div className="absolute top-40 -left-32 h-[500px] w-[500px] rounded-full bg-indigo-400/20 blur-3xl" />
          <div className="absolute top-16 left-[5%] animate-float text-4xl opacity-70">🏫</div>
          <div className="absolute top-24 right-[10%] animate-float-delayed text-3xl opacity-60">📚</div>
          <div className="absolute bottom-32 left-[8%] animate-float text-4xl opacity-70">🎓</div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h1 className="mb-4 text-5xl font-black text-white md:text-6xl">
              香港學校數據庫 🏫
            </h1>
            <p className="text-xl font-medium text-white/90">
              收錄全港中小學資訊，助你選擇最適合孩子的學校
            </p>
          </div>

          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute top-1/2 left-6 h-6 w-6 -translate-y-1/2 text-white/50" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="搜尋學校名稱或地區..."
                className="w-full rounded-2xl border border-white/30 bg-white/20 py-5 pr-6 pl-16 text-lg font-medium text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-white/30"
              />
            </div>

            <div className="mt-4 flex items-center justify-center gap-4">
              <button
                onClick={() => setShowFilters((current) => !current)}
                className="flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/30"
              >
                <Filter className="h-4 w-4" />
                篩選條件
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
              <span className="text-sm font-medium text-white/70">
                {filteredSchools.length} 間學校
              </span>
            </div>

            {showFilters && (
              <div className="mt-4 space-y-4 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  <div>
                    <label className="mb-2 block text-xs font-medium text-white/70">
                      類型
                    </label>
                    <select
                      value={typeFilter}
                      onChange={(event) => setTypeFilter(event.target.value)}
                      className="w-full rounded-xl border border-white/30 bg-white/20 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                      {SCHOOL_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium text-white/70">
                      地區
                    </label>
                    <select
                      value={districtFilter}
                      onChange={(event) => setDistrictFilter(event.target.value)}
                      className="w-full rounded-xl border border-white/30 bg-white/20 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                      {DISTRICTS.map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium text-white/70">
                      Banding
                    </label>
                    <select
                      value={bandingFilter}
                      onChange={(event) => setBandingFilter(event.target.value)}
                      className="w-full rounded-xl border border-white/30 bg-white/20 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                      {BANDINGS.map((banding) => (
                        <option key={banding} value={banding}>
                          {banding}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium text-white/70">
                      性別
                    </label>
                    <select
                      value={genderFilter}
                      onChange={(event) => setGenderFilter(event.target.value)}
                      className="w-full rounded-xl border border-white/30 bg-white/20 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                      {GENDERS.map((gender) => (
                        <option key={gender} value={gender}>
                          {gender}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setTypeFilter("全部");
                    setDistrictFilter("全部");
                    setBandingFilter("全部");
                    setGenderFilter("全部");
                    setSearch("");
                  }}
                  className="w-full text-sm font-medium text-white/60 underline transition-colors hover:text-white"
                >
                  重置所有篩選
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="relative h-16">
          <svg
            className="absolute bottom-0 h-16 w-full text-white"
            viewBox="0 0 1440 64"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0 64L60 58.7C120 53 240 43 360 37.3C480 32 600 32 720 42.7C840 53 960 75 1080 74.7C1200 75 1320 53 1380 32.7L1440 32V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V64Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-blue-50/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredSchools.length === 0 ? (
            <div className="py-20 text-center">
              <div className="mb-4 text-6xl">🔍</div>
              <h3 className="mb-2 text-2xl font-black text-gray-800">
                找不到符合條件的學校
              </h3>
              <p className="font-medium text-gray-500">
                嘗試調整篩選條件或搜尋關鍵字
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredSchools.map((school) => (
                <div
                  key={school.id}
                  className="group overflow-hidden rounded-3xl border-2 border-transparent bg-white shadow-xl transition-all duration-500 hover:border-blue-100 hover:shadow-2xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={school.image}
                      alt={school.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center hidden"
                    >
                      <GraduationCap className="h-16 w-16 text-white/30" />
                    </div>
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${getBandingColor(
                          school.banding
                        )}`}
                      >
                        {school.banding}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${getTypeColor(
                          school.type
                        )}`}
                      >
                        {school.type}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gray-700 backdrop-blur-sm">
                      {school.gender}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-black text-gray-900 transition-colors group-hover:text-blue-600">
                          {school.name}
                        </h3>
                        <p className="text-sm font-medium text-gray-500">
                          {school.name_en}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>{school.district}</span>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {school.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mb-5 space-y-1">
                      {school.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="flex items-center gap-2 text-sm font-medium text-gray-600"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                          {highlight}
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/schools/${school.id}`}
                      className="block w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 py-3 text-center text-sm font-bold text-white transition-all hover:shadow-lg"
                    >
                      查看詳情 →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
