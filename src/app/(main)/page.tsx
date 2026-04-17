import Link from "next/link";
import { GraduationCap, Heart, Brain, ChevronRight, Shield, BarChart3, ArrowRight, Sparkles } from "lucide-react";
import MainLayout from "@/components/MainLayout";

const testimonials = [
  {
    name: "陳太太",
    role: "兩孩媽媽",
    content: "用完AI評估發現仔仔身高偏矮，及時帶去檢查，好彩發現得早！",
    emoji: "👩‍👧‍👦",
    color: "from-pink-400 to-rose-500",
  },
  {
    name: "王爸爸",
    role: "小一家長",
    content: "升學日曆超好用，提前知道所有重要日期，再都唔會錯過！",
    emoji: "👨‍👧",
    color: "from-blue-400 to-indigo-500",
  },
  {
    name: "李媽媽",
    role: "中學家長",
    content: "健康百科的資訊好專業，幫我哋一家都好注意健康生活習慣",
    emoji: "👩‍👦",
    color: "from-green-400 to-emerald-500",
  },
];

const stats = [
  { value: "15+", label: "收錄學校", emoji: "🏫" },
  { value: "500+", label: "用家", emoji: "👨‍👩‍👧‍👦" },
  { value: "98%", label: "滿意度", emoji: "⭐" },
];

export default function HomePage() {
  return (
    <MainLayout>
      <div className="min-h-screen overflow-hidden">
        {/* ═══════════════════════════════════════════ HERO ═══════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 animate-gradient">
          {/* Floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl" />
            <div className="absolute top-40 -left-32 w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 right-20 w-80 h-80 bg-pink-300/30 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />
            
            {/* Floating emojis */}
            <div className="absolute top-16 left-[8%] animate-float text-5xl opacity-80">🏫</div>
            <div className="absolute top-24 right-[12%] animate-float-delayed text-4xl opacity-70">👶</div>
            <div className="absolute top-40 left-[18%] animate-float-delayed-2 text-3xl opacity-60">📚</div>
            <div className="absolute bottom-32 left-[5%] animate-float text-5xl opacity-70">💪</div>
            <div className="absolute bottom-24 right-[8%] animate-float-delayed text-4xl opacity-80">🌈</div>
            <div className="absolute top-1/3 right-[22%] animate-float-delayed-2 text-3xl opacity-60">⭐</div>
            <div className="absolute bottom-40 right-[28%] animate-float text-5xl opacity-70">🎓</div>
            <div className="absolute top-[15%] right-[35%] animate-float-delayed text-2xl opacity-50">✨</div>
            <div className="absolute bottom-[20%] left-[30%] animate-float-delayed-2 text-3xl opacity-60">💜</div>
          </div>

          {/* Hero content - nav is now in MainLayout */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-5 py-2.5 rounded-full text-sm font-bold mb-8 shadow-xl">
                  <Sparkles className="w-4 h-4" />
                  香港家長信賴的成長平台
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                  數據驅動成長
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-yellow-200 animate-gradient" style={{ backgroundSize: "200% 200%" }}>
                    守護每個可能 ✨
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed font-medium">
                  從嬰幼兒到青春期，一站式平台涵蓋
                  <br className="hidden md:block" />
                  📚 升學規劃 · ❤️ 健康追蹤 · 🧠 心靈成長
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12">
                  <Link
                    href="/assessment"
                    className="group inline-flex items-center gap-3 bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
                  >
                    <BarChart3 className="w-6 h-6" />
                    AI 健康評估
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/academic"
                    className="inline-flex items-center gap-2 text-white hover:text-yellow-300 px-4 py-4 font-bold transition-colors"
                  >
                    了解更多 📖
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-3xl md:text-4xl font-black text-white">{stat.value}</div>
                      <div className="text-sm text-white/70 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Visual - Floating card stack */}
              <div className="relative hidden lg:flex justify-center items-center">
                <div className="relative w-[420px] h-[420px]">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-full opacity-40 blur-3xl animate-pulse" />
                  
                  {/* Main card */}
                  <div className="absolute inset-8 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 animate-float">
                    <div className="w-36 h-36 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mb-6 shadow-xl">
                      <span className="text-white font-black text-7xl">G</span>
                    </div>
                    <div className="text-2xl font-black text-gray-800 mb-1">Grow Up</div>
                    <div className="text-sm text-gray-500 font-medium">K-12 全人成長導航平台</div>
                    <div className="mt-4 flex items-center gap-2 text-indigo-600 font-bold">
                      <span className="text-lg">✨</span>
                      <span>探索更多</span>
                    </div>
                  </div>

                  {/* Floating mini cards */}
                  <div className="absolute -top-2 left-4 bg-white rounded-2xl p-4 shadow-xl animate-float" style={{ animationDuration: "3s" }}>
                    <span className="text-3xl">🏫</span>
                  </div>
                  <div className="absolute top-10 -right-4 bg-yellow-100 rounded-2xl p-4 shadow-xl animate-float" style={{ animationDuration: "4s", animationDelay: "1s" }}>
                    <span className="text-3xl">📚</span>
                  </div>
                  <div className="absolute -bottom-2 left-12 bg-pink-100 rounded-2xl p-4 shadow-xl animate-float" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}>
                    <span className="text-3xl">💪</span>
                  </div>
                  <div className="absolute bottom-12 -right-6 bg-cyan-100 rounded-2xl p-4 shadow-xl animate-float" style={{ animationDuration: "4.5s", animationDelay: "1.5s" }}>
                    <span className="text-3xl">🌈</span>
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

        {/* ═══════════════════════════════════════════ THREE PILLARS ═══════════════════════════════════════════ */}
        <section className="py-20 bg-gradient-to-b from-white to-indigo-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
                🚀 三大核心功能
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                培育每一個可能
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                專業、全面、貼心的服務，陪伴孩子成長每一個階段
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Academic Card - Blue theme */}
              <Link
                href="/academic"
                className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-blue-200 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-br from-blue-500 to-indigo-600" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-300/30 rounded-full blur-2xl" />
                
                <div className="relative mb-6 mt-6">
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-10 h-10 text-blue-500" />
                  </div>
                  <div className="absolute -top-2 -right-2 text-4xl animate-bounce-gentle">🏫</div>
                </div>
                
                <h3 className="text-2xl font-black text-gray-900 mb-3">升學及學力導航</h3>
                <p className="text-gray-600 mb-6 font-medium">
                  學校資訊庫、升學日曆、學業技巧，助你作出最佳選擇
                </p>
                
                <ul className="space-y-3 mb-6">
                  {[
                    { text: "香港學校數據庫", emoji: "📊" },
                    { text: "升學日程提醒", emoji: "📅" },
                    { text: "專家學業建議", emoji: "💡" },
                  ].map((item) => (
                    <li key={item.text} className="flex items-center gap-3 text-gray-700 font-medium">
                      <span className="text-lg">{item.emoji}</span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center gap-2 text-blue-600 font-bold text-lg group-hover:gap-4 transition-all">
                  探索更多 <span className="text-xl">→</span>
                </div>
              </Link>

              {/* Health Card - Cyan/Green theme */}
              <Link
                href="/health"
                className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-cyan-200 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-br from-cyan-500 to-emerald-500" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-300/30 rounded-full blur-2xl" />
                
                <div className="relative mb-6 mt-6">
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Heart className="w-10 h-10 text-cyan-500" />
                  </div>
                  <div className="absolute -top-2 -right-2 text-4xl animate-bounce-gentle" style={{ animationDelay: "0.5s" }}>❤️</div>
                </div>
                
                <h3 className="text-2xl font-black text-gray-900 mb-3">全方位健康中心</h3>
                <p className="text-gray-600 mb-6 font-medium">
                  AI 健康評估、生長追蹤、專業健康資訊
                </p>
                
                <ul className="space-y-3 mb-6">
                  {[
                    { text: "AI 生長評估", emoji: "🤖" },
                    { text: "健康百科", emoji: "📖" },
                    { text: "生長曲線追蹤", emoji: "📈" },
                  ].map((item) => (
                    <li key={item.text} className="flex items-center gap-3 text-gray-700 font-medium">
                      <span className="text-lg">{item.emoji}</span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-lg group-hover:gap-4 transition-all">
                  探索更多 <span className="text-xl">→</span>
                </div>
              </Link>

              {/* Wellbeing Card - Orange/Pink theme */}
              <Link
                href="/wellbeing"
                className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-orange-200 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-br from-orange-500 to-pink-500" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-300/30 rounded-full blur-2xl" />
                
                <div className="relative mb-6 mt-6">
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-10 h-10 text-orange-500" />
                  </div>
                  <div className="absolute -top-2 -right-2 text-4xl animate-bounce-gentle" style={{ animationDelay: "1s" }}>🧠</div>
                </div>
                
                <h3 className="text-2xl font-black text-gray-900 mb-3">心靈與軟技能</h3>
                <p className="text-gray-600 mb-6 font-medium">
                  心理發展、青春期導航、未來素養培育
                </p>
                
                <ul className="space-y-3 mb-6">
                  {[
                    { text: "心理發展指南", emoji: "💜" },
                    { text: "青春期導航", emoji: "🌟" },
                    { text: "未來素養培養", emoji: "🚀" },
                  ].map((item) => (
                    <li key={item.text} className="flex items-center gap-3 text-gray-700 font-medium">
                      <span className="text-lg">{item.emoji}</span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center gap-2 text-orange-600 font-bold text-lg group-hover:gap-4 transition-all">
                  探索更多 <span className="text-xl">→</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════ AI ASSESSMENT CTA ═══════════════════════════════════════════ */}
        <section className="py-20 bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
            {/* Floating emojis */}
            <div className="absolute top-10 left-[5%] text-4xl opacity-60 animate-float">🤖</div>
            <div className="absolute top-20 right-[10%] text-3xl opacity-50 animate-float-delayed">📊</div>
            <div className="absolute bottom-16 left-[15%] text-4xl opacity-60 animate-float-delayed-2">👶</div>
            <div className="absolute bottom-20 right-[20%] text-3xl opacity-50 animate-float">✨</div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 md:p-14 border border-white/20 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Left content */}
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
                    <Shield className="w-4 h-4" />
                    專業可靠
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
                    AI 生長評估 🤖
                  </h3>
                  <p className="text-xl text-white/90 mb-8 leading-relaxed font-medium">
                    根據香港衛生署生長圖表，輸入孩子的身高、體重、年齡，即可獲得專業的生長評估報告
                  </p>
                  <ul className="space-y-4 mb-10">
                    {[
                      { text: "對標香港衛生署生長圖表", emoji: "📊" },
                      { text: "智能生長警報系統", emoji: "🚨" },
                      { text: "個人化健康建議", emoji: "💡" },
                      { text: "記錄追蹤孩子成長", emoji: "📈" },
                    ].map((item) => (
                      <li key={item.text} className="flex items-center gap-3 text-white text-lg font-medium">
                        <span className="text-2xl">{item.emoji}</span>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/assessment"
                    className="inline-flex items-center gap-3 bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black text-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                  >
                    立即試用
                    <ArrowRight className="w-6 h-6" />
                  </Link>
                </div>

                {/* Right visual - Phone mockup */}
                <div className="hidden lg:flex justify-center">
                  <div className="relative">
                    <div className="w-72 bg-white rounded-[3rem] shadow-2xl overflow-hidden border-4 border-gray-800">
                      {/* Phone notch */}
                      <div className="h-8 bg-gray-800 flex items-center justify-center">
                        <div className="w-20 h-4 bg-gray-900 rounded-full" />
                      </div>
                      {/* Screen content */}
                      <div className="bg-gradient-to-b from-indigo-500 to-purple-600 p-6 text-white">
                        <div className="text-center mb-4">
                          <span className="text-3xl">🤖</span>
                          <h4 className="text-lg font-black mt-2">AI 生長評估</h4>
                        </div>
                        <div className="space-y-3">
                          <div className="bg-white/20 rounded-xl p-3">
                            <p className="text-xs text-white/70 mb-1">輸入孩子資料</p>
                            <p className="text-sm font-bold">5秒完成 ✅</p>
                          </div>
                          <div className="bg-white/20 rounded-xl p-3">
                            <p className="text-xs text-white/70 mb-1">獲得專業報告</p>
                            <p className="text-sm font-bold">包含詳細建議 📋</p>
                          </div>
                          <div className="bg-yellow-400/90 rounded-xl p-3 text-yellow-900">
                            <p className="text-xs font-bold mb-1">🎉 評估結果</p>
                            <p className="text-sm font-black">孩子生長正常！</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Floating badges */}
                    <div className="absolute -top-4 -right-8 bg-yellow-400 rounded-2xl p-3 shadow-lg animate-bounce-gentle">
                      <span className="text-2xl">⭐</span>
                    </div>
                    <div className="absolute -bottom-4 -left-8 bg-green-400 rounded-2xl p-3 shadow-lg animate-bounce-gentle" style={{ animationDelay: "1s" }}>
                      <span className="text-2xl">✅</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════ TESTIMONIALS ═══════════════════════════════════════════ */}
        <section className="py-20 bg-gradient-to-b from-indigo-50/50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
                ⭐ 家長真實評價
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900">家長點評</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((item, i) => (
                <div
                  key={i}
                  className={`bg-gradient-to-br ${i === 1 ? "from-blue-50 to-indigo-50" : i === 2 ? "from-green-50 to-emerald-50" : "from-pink-50 to-rose-50"} rounded-3xl p-8 border-2 border-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1`}
                >
                  {/* Stars */}
                  <div className="flex items-center gap-1 text-2xl mb-4">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed font-medium">"{item.content}"</p>
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-md`}>
                      <span className="text-2xl">{item.emoji}</span>
                    </div>
                    <div>
                      <p className="font-black text-gray-900 text-lg">{item.name}</p>
                      <p className="text-sm text-gray-500 font-medium">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
