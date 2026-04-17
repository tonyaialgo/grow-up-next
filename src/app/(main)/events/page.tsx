"use client";

import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Bell, Star } from "lucide-react";

const EVENTS = [
  {
    id: "1",
    title: "小一自行分配學位截止",
    date: "2026-11-18",
    dateDisplay: "11月18日",
    category: "升學",
    categoryColor: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    description: "2026年度小一自行分配學位申請截止，家長需在此日期前向心儀學校遞交申請表。",
    type: "重要日期",
    important: true,
  },
  {
    id: "2",
    title: "聖保羅書院開放日",
    date: "2026-10-15",
    dateDisplay: "10月15日",
    category: "學校開放日",
    categoryColor: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    description: "聖保羅書院年度開放日，讓家長和學生了解學校環境、教學理念及課程特色。",
    type: "開放日",
    important: false,
  },
  {
    id: "3",
    title: "中一自行分配學位截止",
    date: "2026-12-02",
    dateDisplay: "12月2日",
    category: "升學",
    categoryColor: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    description: "2026年度中一自行分配學位申請截止，家長可向最多兩間官立或資助中學申請。",
    type: "重要日期",
    important: true,
  },
  {
    id: "4",
    title: "拔萃女書院開放日",
    date: "2026-10-22",
    dateDisplay: "10月22日",
    category: "學校開放日",
    categoryColor: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
    textColor: "text-pink-600",
    description: "拔萃女書院開放日，歡迎小五至小六學生及家長參加，了解學校特色及收生要求。",
    type: "開放日",
    important: false,
  },
  {
    id: "5",
    title: "教育局小一入學申請期",
    date: "2026-09-23",
    dateDisplay: "9月23日 - 11月17日",
    category: "升學",
    categoryColor: "from-cyan-500 to-teal-500",
    bgColor: "bg-cyan-50",
    textColor: "text-cyan-600",
    description: "家長可於此期間透過教育局電子平台遞交小一入學申請，並選擇最多三間官立或資助小學。",
    type: "申請期",
    important: true,
  },
  {
    id: "6",
    title: "喇沙書院開放日",
    date: "2026-11-05",
    dateDisplay: "11月5日",
    category: "學校開放日",
    categoryColor: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
    description: "喇沙書院開放日，展示學校設施、課外活動及學術成就。",
    type: "開放日",
    important: false,
  },
  {
    id: "7",
    title: "TSA 評估",
    date: "2026-10-20",
    dateDisplay: "10月20日起",
    category: "評估",
    categoryColor: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-600",
    description: "全港小三、小六及中三學生基本能力評估（TSA），評估學生基本學術能力。",
    type: "評估",
    important: false,
  },
  {
    id: "8",
    title: "升中選校結果公布",
    date: "2026-07-08",
    dateDisplay: "7月8日",
    category: "升學",
    categoryColor: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    description: "自行分配學位及統一派位結果公布，家長需留意通知信並做好兩手準備。",
    type: "重要日期",
    important: true,
  },
];

const CATEGORIES = ["全部", "升學", "學校開放日", "評估"];

export default function EventsPage() {
  const [category, setCategory] = useState("全部");
  const [showImportant, setShowImportant] = useState(false);

  const filtered = EVENTS.filter((e) => {
    const matchCat = category === "全部" || e.category === category;
    const matchImportant = !showImportant || e.important;
    return matchCat && matchImportant;
  });

  const importantCount = EVENTS.filter((e) => e.important).length;

  return (
    <MainLayout>
      {/* ═══════════════════════════════════════════ HERO ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl" />
          <div className="absolute top-40 -left-32 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-3xl" />
          <div className="absolute top-16 left-[5%] animate-float text-4xl opacity-70">📅</div>
          <div className="absolute top-24 right-[10%] animate-float-delayed text-3xl opacity-60">🗓️</div>
          <div className="absolute bottom-32 left-[8%] animate-float text-4xl opacity-70">⭐</div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
              升學日曆 📅
            </h1>
            <p className="text-xl text-white/90 font-medium">
              重要日期一目了然，不再錯過任何關鍵時機
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-6 flex-wrap">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 text-center border border-white/20">
              <div className="text-3xl font-black text-white">{EVENTS.length}</div>
              <div className="text-white/70 text-sm font-medium">收錄日程</div>
            </div>
            <div className="bg-yellow-400/30 backdrop-blur-sm rounded-2xl px-6 py-4 text-center border border-yellow-400/30">
              <div className="text-3xl font-black text-yellow-300">{importantCount}</div>
              <div className="text-yellow-200/70 text-sm font-medium">重要日期</div>
            </div>
          </div>
        </div>

        <div className="relative h-12">
          <svg className="absolute bottom-0 w-full h-12 text-white" viewBox="0 0 1440 64" fill="none" preserveAspectRatio="none">
            <path d="M0 64L60 58.7C120 53 240 43 360 37.3C480 32 600 32 720 42.7C840 53 960 75 1080 74.7C1200 75 1320 53 1380 32.7L1440 32V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V64Z" fill="currentColor"/>
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ FILTERS ═══════════════════════════════════════════ */}
      <section className="py-8 bg-gradient-to-b from-white to-indigo-50/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 mb-6 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all ${category === cat ? "bg-indigo-600 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-indigo-50 border border-gray-200"}`}
              >
                {cat}
              </button>
            ))}
            <button
              onClick={() => setShowImportant(!showImportant)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all ${showImportant ? "bg-yellow-400 text-yellow-900 shadow-lg" : "bg-white text-gray-600 hover:bg-yellow-50 border border-gray-200"}`}
            >
              ⭐ 只看重要日期
            </button>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            {filtered.map((event) => (
              <div
                key={event.id}
                className={`${event.bgColor} rounded-2xl p-6 border-2 border-transparent hover:border-indigo-200 transition-all shadow-lg`}
              >
                <div className="flex flex-col md:flex-row gap-4 md:items-center">
                  {/* Date Badge */}
                  <div className={`flex-shrink-0 w-20 h-20 bg-gradient-to-br ${event.categoryColor} rounded-2xl flex flex-col items-center justify-center shadow-md`}>
                    <div className="text-white font-black text-sm">{event.dateDisplay}</div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`${event.textColor} bg-white/80 px-3 py-1 rounded-full text-xs font-bold`}>{event.category}</span>
                      {event.important && (
                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">⭐ 重要</span>
                      )}
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-1">{event.title}</h3>
                    <p className="text-gray-600 font-medium">{event.description}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="p-3 bg-white rounded-xl shadow hover:shadow-md transition-all group">
                      <Bell className={`w-5 h-5 ${event.textColor} group-hover:scale-110 transition-transform`} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-2xl font-black text-gray-800 mb-2">暫無相關日程</h3>
                <p className="text-gray-500 font-medium">嘗試調整篩選條件</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
