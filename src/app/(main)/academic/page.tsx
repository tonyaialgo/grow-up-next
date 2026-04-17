import MainLayout from "@/components/MainLayout";
import { GraduationCap, Calendar, BookOpen, Search, ArrowRight, Award, Users } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: BookOpen,
    title: "香港學校數據庫",
    desc: "收錄全港中小學資料，包含Banding、校風、入學要求等資訊",
    gradient: "from-blue-500 to-indigo-600",
    iconColor: "text-blue-500",
    emoji: "🏫",
    highlights: ["按地區搜尋", "按Banding篩選", "學校比較功能"],
  },
  {
    icon: Calendar,
    title: "升學日曆",
    desc: "自動提醒各校開放日、報名截止日期，不錯過任何重要日程",
    gradient: "from-violet-500 to-purple-600",
    iconColor: "text-violet-500",
    emoji: "📅",
    highlights: ["小一自行分配學位", "中一自行分配學位", "學校開放日預告"],
  },
  {
    icon: Search,
    title: "學業小貼士",
    desc: "涵蓋不同階段的學習方法、校內外比賽資訊，助孩子全面發展",
    gradient: "from-pink-500 to-rose-600",
    iconColor: "text-pink-500",
    emoji: "💡",
    highlights: ["小學階段攻略", "升中適應技巧", "課外活動建議"],
  },
];

const schoolTypes = [
  { label: "官立小學", count: 34, emoji: "🏛️", color: "from-blue-400 to-indigo-500" },
  { label: "資助小學", count: 423, emoji: "🏫", color: "from-purple-400 to-violet-500" },
  { label: "直資學校", count: 61, emoji: "⭐", color: "from-pink-400 to-rose-500" },
  { label: "私立學校", count: 47, emoji: "🎓", color: "from-orange-400 to-amber-500" },
  { label: "國際學校", count: 52, emoji: "🌍", color: "from-cyan-400 to-teal-500" },
];

export default function AcademicPage() {
  return (
    <MainLayout>
      {/* ═══════════════════════════════════════════ HERO ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-600">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl" />
          <div className="absolute top-40 -left-32 w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 right-20 w-80 h-80 bg-purple-300/30 rounded-full blur-3xl" />
          {/* Floating emojis */}
          <div className="absolute top-16 left-[5%] animate-float text-4xl opacity-70">🏫</div>
          <div className="absolute top-24 right-[10%] animate-float-delayed text-3xl opacity-60">📚</div>
          <div className="absolute top-40 left-[15%] animate-float-delayed-2 text-3xl opacity-50">🎓</div>
          <div className="absolute bottom-32 left-[8%] animate-float text-4xl opacity-70">📖</div>
          <div className="absolute bottom-24 right-[12%] animate-float-delayed text-3xl opacity-60">⭐</div>
          <div className="absolute top-1/3 right-[20%] animate-float-delayed-2 text-2xl opacity-50">✨</div>
        </div>

        {/* Hero content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-5 py-2.5 rounded-full text-sm font-bold mb-6 shadow-xl">
                <GraduationCap className="w-4 h-4" />
                升學規劃必備
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                升學及
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-200 to-yellow-200">
                  學力導航 📚
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-10 leading-relaxed font-medium">
                學校數據庫 · 升學日曆 · 學業技巧
                <br />助你為孩子選擇最適合的學校 🎯
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/schools"
                  className="group inline-flex items-center gap-3 bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
                >
                  <BookOpen className="w-6 h-6" />
                  探索學校
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* School type stats */}
              <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
                {schoolTypes.map((item) => (
                  <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center border border-white/20">
                    <div className="text-2xl font-black text-white">{item.count}+</div>
                    <div className="text-xs text-white/70 font-medium">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right visual */}
            <div className="relative hidden lg:flex justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-violet-400 rounded-full opacity-40 blur-3xl" />
                <div className="absolute inset-8 bg-white/95 backdrop-blur rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 rounded-3xl flex items-center justify-center mb-6 shadow-xl">
                    <GraduationCap className="w-16 h-16 text-white" />
                  </div>
                  <div className="text-2xl font-black text-gray-800 mb-1">School DB</div>
                  <div className="text-sm text-gray-500 font-medium">500+ 收錄學校</div>
                </div>
                <div className="absolute -top-2 left-4 bg-white rounded-2xl p-4 shadow-xl animate-float" style={{ animationDuration: "3s" }}>
                  <span className="text-3xl">🏫</span>
                </div>
                <div className="absolute top-10 -right-4 bg-blue-100 rounded-2xl p-4 shadow-xl animate-float" style={{ animationDuration: "4s", animationDelay: "1s" }}>
                  <span className="text-3xl">📊</span>
                </div>
                <div className="absolute -bottom-2 left-12 bg-violet-100 rounded-2xl p-4 shadow-xl animate-float" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}>
                  <span className="text-3xl">⭐</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="relative h-16">
          <svg className="absolute bottom-0 w-full h-16 text-white" viewBox="0 0 1440 64" fill="none" preserveAspectRatio="none">
            <path d="M0 64L60 58.7C120 53 240 43 360 37.3C480 32 600 32 720 42.7C840 53 960 75 1080 74.7C1200 75 1320 53 1380 32.7L1440 32V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V64Z" fill="currentColor"/>
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ FEATURES ═══════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
              📚 升學必備工具
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              助你作出最佳選擇
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              專業數據支持，助家長找到最適合孩子的學校
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-blue-100 overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-br ${item.gradient}`} />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl" />

                  <div className="relative mb-6 mt-6">
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`w-10 h-10 ${item.iconColor}`} />
                    </div>
                    <div className="absolute -top-2 -right-2 text-4xl animate-bounce-gentle">{item.emoji}</div>
                  </div>

                  <h3 className="text-2xl font-black text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-6 font-medium">{item.desc}</p>

                  <ul className="space-y-3">
                    {item.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-3 text-gray-700 font-medium">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
