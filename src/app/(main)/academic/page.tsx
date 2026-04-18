import MainLayout from "@/components/MainLayout";
import { GraduationCap, Calendar, BookOpen, Search, ArrowRight, Award, Users, Clock, Star, CheckCircle2, ChevronRight, AlertCircle, Lightbulb, Target, BookMarked, FileText, Brain, Timer, Repeat, Zap } from "lucide-react";
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

// ─── 升學日曆 ───
const calendarEvents = [
  {
    month: "1月",
    icon: "🗓️",
    color: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50",
    borderColor: "border-blue-200",
    accentColor: "text-blue-600",
    events: [
      { date: "1月上旬", title: "小一自行分配學位申請", type: "重要", typeColor: "bg-red-100 text-red-700", desc: "家長向指定官立或資助小學提交申請表，每年9月申請，1月公布結果", urgent: true },
      { date: "1月", title: "中一自行分配學位申請", type: "重要", typeColor: "bg-red-100 text-red-700", desc: "小六學生家長向參加中一自行分配學位計劃的中學提交申請", urgent: true },
    ]
  },
  {
    month: "3月",
    icon: "📝",
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50",
    borderColor: "border-amber-200",
    accentColor: "text-amber-600",
    events: [
      { date: "3月", title: "直資及私立學校面試期", type: "報名", typeColor: "bg-blue-100 text-blue-700", desc: "多間直資及私立學校於3-4月舉行入學面試，部分學校全年接受申請", urgent: false },
      { date: "3月中旬", title: "小六學生升中自行分配結果公布", type: "結果", typeColor: "bg-violet-100 text-violet-700", desc: "教育局公布自行分配學位結果，獲取錄者無需參加統一派位", urgent: true },
    ]
  },
  {
    month: "4月",
    icon: "🎯",
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50",
    borderColor: "border-emerald-200",
    accentColor: "text-emerald-600",
    events: [
      { date: "4月上旬", title: "中一統一派位選校", type: "重要", typeColor: "bg-red-100 text-red-700", desc: "未獲自行分配學位的學生家長需於4月填寫統一派位選校表", urgent: true },
      { date: "4-5月", title: "學校開放日高峰期", type: "資訊", typeColor: "bg-green-100 text-green-700", desc: "多間中小學於4-5月舉行開放日，家長可親身了解學校環境及教學理念", urgent: false },
    ]
  },
  {
    month: "6月",
    icon: "⚠️",
    color: "from-pink-500 to-rose-600",
    bgLight: "bg-pink-50",
    borderColor: "border-pink-200",
    accentColor: "text-pink-600",
    events: [
      { date: "6月", title: "DSE考試放榜準備", type: "重要", typeColor: "bg-red-100 text-red-700", desc: "中六學生準備DSE放榜，了解JUPAS聯招改選策略及院校面試準備", urgent: false },
      { date: "6月", title: "暑期銜接課程報名", type: "報名", typeColor: "bg-blue-100 text-blue-700", desc: "為升小一、小六及中一的學生報讀銜接課程，提前適應新學制", urgent: false },
    ]
  },
  {
    month: "9月",
    icon: "🚀",
    color: "from-violet-500 to-purple-600",
    bgLight: "bg-violet-50",
    borderColor: "border-violet-200",
    accentColor: "text-violet-600",
    events: [
      { date: "9月", title: "小一自行分配學位申請期", type: "報名", typeColor: "bg-blue-100 text-blue-700", desc: "新學年小一入學申請開始，家長選擇最多2所官立或資助小學", urgent: true },
      { date: "9月", title: "國際學校申請開放", type: "報名", typeColor: "bg-blue-100 text-blue-700", desc: "多間國際學校於9-10月開放下一學年入學申請，部分採用全年接受申請", urgent: false },
    ]
  },
  {
    month: "12月",
    icon: "🎄",
    color: "from-cyan-500 to-blue-600",
    bgLight: "bg-cyan-50",
    borderColor: "border-cyan-200",
    accentColor: "text-cyan-600",
    events: [
      { date: "12月", title: "學校報名截止高峰", type: "截止", typeColor: "bg-red-100 text-red-700", desc: "多間直資、私立及國際學校12月截止報名，家長需留意各校截止日期", urgent: true },
      { date: "12月", title: "升中面試準備", type: "準備", typeColor: "bg-amber-100 text-amber-700", desc: "為報讀直資或私校的中一學生準備面試，包括個人陳述及時事問答", urgent: false },
    ]
  },
];

// ─── 學業小貼士 ───
const studyTips = [
  {
    icon: Timer,
    title: "番茄工作法",
    emoji: "🍅",
    color: "from-red-400 to-rose-500",
    bgLight: "bg-red-50",
    borderColor: "border-red-200",
    accentColor: "text-red-600",
    tip: "將學習時間分成25分鐘專注學習 + 5分鐘休息的循環。每完成4個「番茄鐘」後，休息15-30分鐘。這個方法特別適合容易分心的孩子，能有效提升專注力和學習效率。",
   适用: "適合小學三年級以上學生"
  },
  {
    icon: Repeat,
    title: "間隔重複記憶法",
    emoji: "🧠",
    color: "from-violet-400 to-purple-500",
    bgLight: "bg-violet-50",
    borderColor: "border-violet-200",
    accentColor: "text-violet-600",
    tip: "背誦並非一次重複就能記住。建議用「間隔重複」：今天背完新單詞後，明天、後天、一週後、一個月後分別重溫。配合閃卡（Anki等工具）效果更佳，科學證明這種方式比一次性密集背誦長期記憶效果高出約50%。",
   适用: "適合英文生字、歷史年份、術語背誦"
  },
  {
    icon: Brain,
    title: "主動回想 vs 重閱",
    emoji: "💡",
    color: "from-amber-400 to-orange-500",
    bgLight: "bg-amber-50",
    borderColor: "border-amber-200",
    accentColor: "text-amber-600",
    tip: "研究顯示，測試自己（主動回想）比單純重複閱讀更能加深記憶。學習時不要只是「看過」，而是定期合上書本，嘗試說出或寫下剛學的內容。看似更費力，卻是更有效的學習方式。",
   适用: "適合溫習任何學科"
  },
  {
    icon: FileText,
    title: "做筆記的藝術",
    emoji: "📝",
    color: "from-blue-400 to-indigo-500",
    bgLight: "bg-blue-50",
    borderColor: "border-blue-200",
    accentColor: "text-blue-600",
    tip: "好筆記不是抄黑板，而是用自己的語言重組資訊。建議用「康奈爾筆記法」：把頁面分為左邊提示欄（關鍵詞）、右邊主要欄（詳細內容）、底部總結欄（用一句話總結）。每節課後或每天溫習時，用左邊的提示欄主動回想右邊的內容。",
   适用: "適合中學及以上學生"
  },
  {
    icon: Target,
    title: "先難後易原則",
    emoji: "🎯",
    color: "from-emerald-400 to-teal-500",
    bgLight: "bg-emerald-50",
    borderColor: "border-emerald-200",
    accentColor: "text-emerald-600",
    tip: "每天學習時，先處理最困難或最不想做的科目（大約精力最充沛的時候），把簡單或感興趣的科目留到最後。心理學上的「報復性拖延」往往源於一開始就做簡單的事，到後面精力耗盡時難題變得更難處理。",
   适用: "適合需要兼顧多科的學生"
  },
  {
    icon: Lightbulb,
    title: "費曼學習法",
    emoji: "✨",
    color: "from-pink-400 to-rose-500",
    bgLight: "bg-pink-50",
    borderColor: "border-pink-200",
    accentColor: "text-pink-600",
    tip: "用一句話解釋一個概念，給一個8歲小孩聽。如果解釋時卡住或用了很多術語，代表你還沒有真正理解。這個方法能快速識別知識盲點，讓學習更有針對性。家長可以用這個方法與孩子互動：「教我你今天學了什麼？」",
   适用: "適合理解數學、科學等概念性內容"
  },
  {
    icon: BookMarked,
    title: "數學解題策略",
    emoji: "📐",
    color: "from-cyan-400 to-blue-500",
    bgLight: "bg-cyan-50",
    borderColor: "border-cyan-200",
    accentColor: "text-cyan-600",
    tip: "數學解題不要急於下筆，先「讀三遍題目」：第一遍理解情境，第二遍標記關鍵數字和條件，第三遍問自己「這道題在問什麼？」、「我見過類似的題型嗎？」、「需要用到什麼公式？」。這個習慣能大幅減少因粗心而失分。",
   适用: "適合小學高年級及以上"
  },
  {
    icon: Zap,
    title: "DSE應試技巧",
    emoji: "⚡",
    color: "from-yellow-400 to-amber-500",
    bgLight: "bg-yellow-50",
    borderColor: "border-yellow-200",
    accentColor: "text-amber-600",
    tip: "考試時先快速瀏覽全卷，標記有信心作答的題目，先拿穩該拿的分。遇到難題不要糾纏，先做下一題，確保時間分配合理。卷別時間分配至關重要——不要在MC浪費過多時間，留足够時間應付長題目。",
   适用: "適合DSE考生"
  },
];

export default function AcademicPage() {
  return (
    <MainLayout>
      {/* ═══════════════════════════════════════════ HERO ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-600">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl" />
          <div className="absolute top-40 -left-32 w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 right-20 w-80 h-80 bg-purple-300/30 rounded-full blur-3xl" />
          <div className="absolute top-16 left-[5%] animate-float text-4xl opacity-70">🏫</div>
          <div className="absolute top-24 right-[10%] animate-float-delayed text-3xl opacity-60">📚</div>
          <div className="absolute top-40 left-[15%] animate-float-delayed-2 text-3xl opacity-50">🎓</div>
          <div className="absolute bottom-32 left-[8%] animate-float text-4xl opacity-70">📖</div>
          <div className="absolute bottom-24 right-[12%] animate-float-delayed text-3xl opacity-60">⭐</div>
        </div>

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
              <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
                {schoolTypes.map((item) => (
                  <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center border border-white/20">
                    <div className="text-2xl font-black text-white">{item.count}+</div>
                    <div className="text-xs text-white/70 font-medium">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

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
                <div key={item.title} className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-blue-100 overflow-hidden">
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

      {/* ═══════════════════════════════════════════ 升學日曆 ═══════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-b from-white to-violet-50/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
              📅 升學日曆
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              香港升學重要日程
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              收藏這份日程表，不再錯過任何重要截止日期
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-violet-200 to-pink-200 hidden md:block" />

            <div className="space-y-6">
              {calendarEvents.map((month) => (
                <div key={month.month} className="relative">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Desktop: left side */}
                    <div className="hidden md:flex flex-col items-end w-1/2 pr-8">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r ${month.color} shadow-lg`}>
                        <span>{month.icon}</span>
                        <span>{month.month}</span>
                      </div>
                    </div>

                    {/* Desktop: center dot */}
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 mt-2">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${month.color} shadow-lg border-2 border-white`} />
                    </div>

                    {/* Mobile: month tag */}
                    <div className="md:hidden flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${month.color} shadow-lg flex items-center justify-center`}>
                        <span className="text-sm">{month.icon}</span>
                      </div>
                      <span className={`font-black text-white bg-gradient-to-r ${month.color} px-3 py-1 rounded-full text-sm`}>{month.month}</span>
                    </div>

                    {/* Events */}
                    <div className="flex-1">
                      <div className={`rounded-2xl border-2 ${month.borderColor} ${month.bgLight} p-5`}>
                        <div className="space-y-4">
                          {month.events.map((event) => (
                            <div key={event.title} className="flex gap-4">
                              <div className="flex-shrink-0 mt-1">
                                {event.urgent
                                  ? <AlertCircle className={`w-5 h-5 ${month.accentColor}`} />
                                  : <CheckCircle2 className={`w-5 h-5 ${month.accentColor}`} />
                                }
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${event.typeColor}`}>{event.type}</span>
                                  <span className="text-xs text-gray-500 font-medium">{event.date}</span>
                                </div>
                                <h4 className="font-black text-gray-900 mb-1">{event.title}</h4>
                                <p className="text-sm text-gray-600 font-medium leading-relaxed">{event.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 bg-blue-50 border border-blue-200 rounded-2xl p-6 flex flex-wrap gap-6 justify-center text-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-gray-700 font-medium">重要截止</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="text-gray-700 font-medium">一般資訊</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ 學業小貼士 ═══════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
              💡 學業小貼士
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              有效學習方法
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              基於科學研究的學習策略，適用於香港中小學生
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studyTips.map((tip) => {
              const Icon = tip.icon;
              return (
                <div key={tip.title} className={`group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${tip.borderColor} hover:scale-[1.02]`}>
                  <div className={`absolute top-0 left-0 right-0 h-20 bg-gradient-to-br ${tip.color} opacity-10 rounded-t-2xl`} />
                  <div className="relative">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tip.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{tip.emoji}</span>
                          <h4 className="font-black text-gray-900 text-lg">{tip.title}</h4>
                        </div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${tip.color} text-white opacity-80`}>{tip.适用}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed font-medium text-sm">{tip.tip}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* General study principles */}
          <div className="mt-12 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-3xl p-8 border-2 border-indigo-100">
            <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
              <Star className="w-6 h-6 text-indigo-500" />
              通用學習原則
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { emoji: "😴", text: "每天睡够7-9小時，睡眠不足會讓記憶力下降約40%" },
                { emoji: "💧", text: "學習時保持充足水分，脫水2%就會影響專注力" },
                { emoji: "🏃", text: "每學習45分鐘起身活動5分鐘，運動能提升記憶鞏固" },
                { emoji: "📱", text: "關閉手機通知或使用專注模式，通知每次打擾需23分鐘恢復專注" },
                { emoji: "🌙", text: "睡前温習有助記憶固化，但避免太晚造成睡前焦慮" },
                { emoji: "🍎", text: "早餐吃蛋白質和複合碳水，有助穩定血糖維持專注" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-indigo-100">
                  <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                  <p className="text-sm text-gray-700 font-medium leading-snug">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
