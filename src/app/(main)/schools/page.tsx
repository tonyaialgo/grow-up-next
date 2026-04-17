"use client";

import { useState, useEffect } from "react";
import MainLayout from "@/components/MainLayout";
import { GraduationCap, Search, MapPin, Star, Filter, ChevronDown } from "lucide-react";
import Link from "next/link";

const SAMPLE_SCHOOLS = [
  {
    id: "1",
    name: "拔萃女書院",
    name_en: "Diocesan Girls' School",
    district: "油尖旺",
    banding: "Banding 1",
    type: "直資",
    gender: "女校",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
    tags: ["英文中小學", "直資", "Band 1"],
    highlights: ["DSE 成績卓越", "課外活動多元", "師資優良"],
  },
  {
    id: "2",
    name: "聖保羅書院",
    name_en: "St. Paul's College",
    district: "中西區",
    banding: "Banding 1",
    type: "直資",
    gender: "男校",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
    tags: ["英文中小學", "直資", "Band 1"],
    highlights: ["歷史悠久", "校風純樸", "升學率高"],
  },
  {
    id: "3",
    name: "喇沙書院",
    name_en: "La Salle College",
    district: "九龍城",
    banding: "Banding 1",
    type: "資助",
    gender: "男校",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
    tags: ["英文中學", "資助", "Band 1"],
    highlights: ["喇沙會辦學", "學術表現佳", "體育強項"],
  },
  {
    id: "4",
    name: "英華書院",
    name_en: "Ying Wa College",
    district: "深水埗",
    banding: "Banding 1",
    type: "資助",
    gender: "男校",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
    tags: ["英文中學", "資助", "Band 1"],
    highlights: ["基督教背景", "校風良好", "升學優秀"],
  },
  {
    id: "5",
    name: "協恩中學",
    name_en: "Heep Yunn School",
    district: "九龍城",
    banding: "Banding 1",
    type: "資助",
    gender: "女校",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
    tags: ["英文中小學", "資助", "Band 1"],
    highlights: ["基督教教育", "全面發展", "師生關係佳"],
  },
  {
    id: "6",
    name: "庇理羅士女子中學",
    name_en: "Belilios Public School",
    district: "東區",
    banding: "Banding 1",
    type: "官立",
    gender: "女校",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
    tags: ["英文中學", "官立", "Band 1"],
    highlights: ["百年名校", "學術水平高", "校風純樸"],
  },
  {
    id: "7",
    name: "皇仁書院",
    name_en: "Queen's College",
    district: "灣仔",
    banding: "Banding 1",
    type: "官立",
    gender: "男校",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
    tags: ["英文中學", "官立", "Band 1"],
    highlights: ["歷史悠久", "DSE 成績佳", "師資優良"],
  },
  {
    id: "8",
    name: "瑪利諾修院學校",
    name_en: "Maryknoll Convent School",
    district: "九龍城",
    banding: "Banding 1",
    type: "資助",
    gender: "女校",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
    tags: ["英文中小學", "資助", "Band 1"],
    highlights: ["天主教背景", "學術優秀", "課外活動多元"],
  },
  {
    id: "9",
    name: "聖士提反書院",
    name_en: "St. Stephen's College",
    district: "南區",
    banding: "Banding 1",
    type: "直資",
    gender: "男女校",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
    tags: ["英文中小學", "直資", "Band 1"],
    highlights: ["寄宿服務", "國際視野", "設施完善"],
  },
  {
    id: "10",
    name: "香港華仁書院",
    name_en: "Wah Yan College, Hong Kong",
    district: "灣仔",
    banding: "Banding 1",
    type: "資助",
    gender: "男校",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
    tags: ["英文中學", "資助", "Band 1"],
    highlights: ["耶穌會辦學", "全人教育", "升學率高"],
  },
  {
    id: "11",
    name: "嘉諾撒聖心書院",
    name_en: "Sacred Heart Canossian College",
    district: "中西區",
    banding: "Banding 1",
    type: "資助",
    gender: "女校",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
    tags: ["英文中學", "資助", "Band 1"],
    highlights: ["天主教背景", "學術優良", "校風純樸"],
  },
  {
    id: "12",
    name: "金文泰中學",
    name_en: "Clementi Secondary School",
    district: "東區",
    banding: "Banding 2",
    type: "官立",
    gender: "男女校",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
    tags: ["英文中學", "官立", "Band 2"],
    highlights: ["校風良好", "師資穩定", "活動多元"],
  },
];

const SCHOOL_TYPES = ["全部", "官立", "資助", "直資", "私立", "國際"];
const DISTRICTS = ["全部", "中西區", "灣仔", "東區", "南區", "九龍城", "深水埗", "油尖旺", "觀塘", "其他"];
const BANDINGS = ["全部", "Banding 1", "Banding 2", "Banding 3"];
const GENDERS = ["全部", "男校", "女校", "男女校"];

export default function SchoolsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("全部");
  const [districtFilter, setDistrictFilter] = useState("全部");
  const [bandingFilter, setBandingFilter] = useState("全部");
  const [genderFilter, setGenderFilter] = useState("全部");
  const [showFilters, setShowFilters] = useState(false);
  const [schools, setSchools] = useState<typeof SAMPLE_SCHOOLS>([]);

  useEffect(() => {
    fetch('/api/schools')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setSchools(data);
        } else {
          setSchools(SAMPLE_SCHOOLS);
        }
      })
      .catch(() => setSchools(SAMPLE_SCHOOLS));
  }, []);

  const filteredSchools = schools.filter((school) => {
    const matchesSearch =
      school.name.toLowerCase().includes(search.toLowerCase()) ||
      school.name_en.toLowerCase().includes(search.toLowerCase()) ||
      school.district.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "全部" || school.type === typeFilter;
    const matchesDistrict = districtFilter === "全部" || school.district === districtFilter;
    const matchesBanding = bandingFilter === "全部" || school.banding === bandingFilter;
    const matchesGender = genderFilter === "全部" || school.gender === genderFilter;
    return matchesSearch && matchesType && matchesDistrict && matchesBanding && matchesGender;
  });

  const getBandingColor = (banding: string) => {
    if (banding === "Banding 1") return "bg-yellow-100 text-yellow-700";
    if (banding === "Banding 2") return "bg-blue-100 text-blue-700";
    return "bg-gray-100 text-gray-600";
  };

  const getTypeColor = (type: string) => {
    if (type === "官立") return "bg-purple-100 text-purple-700";
    if (type === "資助") return "bg-indigo-100 text-indigo-700";
    if (type === "直資") return "bg-pink-100 text-pink-700";
    if (type === "私立") return "bg-orange-100 text-orange-700";
    return "bg-cyan-100 text-cyan-700";
  };

  return (
    <MainLayout>
      {/* ═══════════════════════════════════════════ HERO ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-600">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl" />
          <div className="absolute top-40 -left-32 w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-3xl" />
          <div className="absolute top-16 left-[5%] animate-float text-4xl opacity-70">🏫</div>
          <div className="absolute top-24 right-[10%] animate-float-delayed text-3xl opacity-60">📚</div>
          <div className="absolute bottom-32 left-[8%] animate-float text-4xl opacity-70">🎓</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
              香港學校數據庫 🏫
            </h1>
            <p className="text-xl text-white/90 font-medium">
              收錄全港中小學資訊，助你選擇最適合孩子的學校
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/50" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜尋學校名稱或地區..."
                className="w-full pl-16 pr-6 py-5 rounded-2xl text-lg font-medium bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
            </div>

            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2.5 rounded-full font-bold text-sm border border-white/30 hover:bg-white/30 transition-all"
              >
                <Filter className="w-4 h-4" />
                篩選條件
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </button>
              <span className="text-white/70 text-sm font-medium">
                {filteredSchools.length} 間學校
              </span>
            </div>

            {showFilters && (
              <div className="mt-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-white/70 text-xs font-medium mb-2">類型</label>
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                      {SCHOOL_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/70 text-xs font-medium mb-2">地區</label>
                    <select
                      value={districtFilter}
                      onChange={(e) => setDistrictFilter(e.target.value)}
                      className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                      {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/70 text-xs font-medium mb-2">Banding</label>
                    <select
                      value={bandingFilter}
                      onChange={(e) => setBandingFilter(e.target.value)}
                      className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                      {BANDINGS.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/70 text-xs font-medium mb-2">性別</label>
                    <select
                      value={genderFilter}
                      onChange={(e) => setGenderFilter(e.target.value)}
                      className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                      {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => { setTypeFilter("全部"); setDistrictFilter("全部"); setBandingFilter("全部"); setGenderFilter("全部"); setSearch(""); }}
                  className="w-full text-white/60 hover:text-white text-sm font-medium underline transition-colors"
                >
                  重置所有篩選
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Wave divider */}
        <div className="relative h-16">
          <svg className="absolute bottom-0 w-full h-16 text-white" viewBox="0 0 1440 64" fill="none" preserveAspectRatio="none">
            <path d="M0 64L60 58.7C120 53 240 43 360 37.3C480 32 600 32 720 42.7C840 53 960 75 1080 74.7C1200 75 1320 53 1380 32.7L1440 32V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V64Z" fill="currentColor"/>
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ SCHOOLS LIST ═══════════════════════════════════════════ */}
      <section className="py-12 bg-gradient-to-b from-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredSchools.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">找不到符合條件的學校</h3>
              <p className="text-gray-500 font-medium">嘗試調整篩選條件或搜尋關鍵字</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSchools.map((school) => (
                <div
                  key={school.id}
                  className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-blue-100"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <GraduationCap className="w-16 h-16 text-white/30" />
                    </div>
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getBandingColor(school.banding)}`}>{school.banding}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getTypeColor(school.type)}`}>{school.type}</span>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-gray-700">
                      {school.gender}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-black text-gray-900 group-hover:text-blue-600 transition-colors">{school.name}</h3>
                        <p className="text-sm text-gray-500 font-medium">{school.name_en}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{school.district}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {school.tags.map((tag) => (
                        <span key={tag} className="bg-blue-50 text-blue-600 px-2 py-1 rounded-lg text-xs font-medium">{tag}</span>
                      ))}
                    </div>

                    <div className="space-y-1 mb-5">
                      {school.highlights.map((h) => (
                        <div key={h} className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                          {h}
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/schools/${school.id}`}
                      className="block w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all"
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
    </MainLayout>
  );
}
