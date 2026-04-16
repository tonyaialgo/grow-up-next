import Link from "next/link";
import { GraduationCap, Heart, Brain, ChevronRight, Shield, BarChart3, Award, ArrowRight } from "lucide-react";
import MainLayout from "@/components/MainLayout";

const testimonials = [
  {
    name: "陳太太",
    role: "兩孩媽媽",
    content: "用完AI評估發現仔仔身高偏矮，及時帶去檢查，好彩發現得早！",
  },
  {
    name: "王爸爸",
    role: "小一家長",
    content: "升學日曆超好用，提前知道所有重要日期，再都唔會錯過！",
  },
  {
    name: "李媽媽",
    role: "中學家長",
    content: "健康百科的資訊好專業，幫我哋一家都好注意健康生活習慣",
  },
];

export default function HomePage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full opacity-20 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-200 rounded-full opacity-20 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-100 to-accent-100 rounded-full opacity-30 blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary-200 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
                  <Award className="w-4 h-4" />
                  香港家長信賴的成長平台
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
                  數據驅動成長
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">
                    守護每個可能
                  </span>
                </h1>

                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  從嬰幼兒到青春期，一站式平台涵蓋<br className="hidden md:block" />
                  升學規劃、健康追蹤、心靈成長
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <Link
                    href="/assessment"
                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    <BarChart3 className="w-5 h-5" />
                    AI健康評估
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/academic"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 px-4 py-4 font-medium transition-colors"
                  >
                    了解更多
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* Right Visual */}
              <div className="relative hidden lg:flex justify-center items-center">
                <div className="relative w-80 h-80">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full opacity-20 blur-3xl" />
                  <div className="absolute inset-8 bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8">
                    <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center mb-6 shadow-lg">
                      <span className="text-white font-black text-6xl">G</span>
                    </div>
                    <div className="text-2xl font-black text-gray-900 mb-1">Grow Up</div>
                    <div className="text-sm text-gray-500">K-12 全人成長導航平台</div>
                  </div>
                  <div className="absolute -top-4 left-4 bg-white rounded-2xl p-4 shadow-lg animate-bounce" style={{ animationDuration: "3s" }}>
                    <GraduationCap className="w-8 h-8 text-primary-500" />
                  </div>
                  <div className="absolute top-10 -right-4 bg-white rounded-2xl p-4 shadow-lg animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }}>
                    <Heart className="w-8 h-8 text-accent-500" />
                  </div>
                  <div className="absolute -bottom-4 left-10 bg-white rounded-2xl p-4 shadow-lg animate-bounce" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}>
                    <Brain className="w-8 h-8 text-primary-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Three Pillars */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-sm font-bold text-primary-600 uppercase tracking-wider mb-4 block">核心功能</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                培育每一個可能
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                專業、全面、貼心的服務，陪伴孩子成長每一個階段
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Academic Card */}
              <Link
                href="/academic"
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-primary-400 to-primary-600" />
                <div className="relative mb-6 mt-4">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-primary-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">升學及學力導航</h3>
                <p className="text-gray-600 mb-6">
                  學校資訊庫、升學日曆、學業技巧，助你作出最佳選擇
                </p>
                <ul className="space-y-2 mb-6">
                  {["香港學校數據庫", "升學日程提醒", "專家學業建議"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 text-primary-600 font-semibold group-hover:gap-3 transition-all">
                  探索更多 <ChevronRight className="w-5 h-5" />
                </div>
              </Link>

              {/* Health Card */}
              <Link
                href="/health"
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-accent-400 to-accent-600" />
                <div className="relative mb-6 mt-4">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                    <Heart className="w-8 h-8 text-accent-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">全方位健康中心</h3>
                <p className="text-gray-600 mb-6">
                  AI 健康評估、生長追蹤、專業健康資訊
                </p>
                <ul className="space-y-2 mb-6">
                  {["AI 生長評估", "健康百科", "生長曲線追蹤"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-accent-400 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 text-accent-600 font-semibold group-hover:gap-3 transition-all">
                  探索更多 <ChevronRight className="w-5 h-5" />
                </div>
              </Link>

              {/* Wellbeing Card */}
              <Link
                href="/wellbeing"
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-primary-400 to-primary-600" />
                <div className="relative mb-6 mt-4">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                    <Brain className="w-8 h-8 text-primary-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">心靈與軟技能</h3>
                <p className="text-gray-600 mb-6">
                  心理發展、青春期導航、未來素養培育
                </p>
                <ul className="space-y-2 mb-6">
                  {["心理發展指南", "青春期導航", "未來素養培養"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 text-primary-600 font-semibold group-hover:gap-3 transition-all">
                  探索更多 <ChevronRight className="w-5 h-5" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* AI Assessment Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 md:p-12 lg:py-16">
                  <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                    <Shield className="w-4 h-4" />
                    專業可靠
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                    AI 生長評估
                  </h3>
                  <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                    根據香港衛生署生長圖表，輸入孩子的身高、體重、年齡，即可獲得專業的生長評估報告
                  </p>
                  <ul className="space-y-4 mb-10">
                    {[
                      "對標香港衛生署生長圖表",
                      "智能生長警報系統",
                      "個人化健康建議",
                      "記錄追蹤孩子成長",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/assessment"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  >
                    立即試用
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
                <div className="bg-gradient-to-br from-primary-500 to-accent-500 p-8 md:p-12 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-3xl mb-6 backdrop-blur">
                      <span className="text-4xl font-black">G</span>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
                        <p className="text-white/80 text-sm mb-1">輸入孩子資料</p>
                        <p className="text-white text-xs opacity-70">5秒完成</p>
                      </div>
                      <div className="flex justify-center">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                      <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
                        <p className="text-white/80 text-sm mb-1">獲得專業報告</p>
                        <p className="text-white text-xs opacity-70">包含詳細建議</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-sm font-bold text-primary-600 uppercase tracking-wider mb-4 block">用家心聲</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">家長點評</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-6">
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">"{item.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-black text-lg">{item.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.role}</p>
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
