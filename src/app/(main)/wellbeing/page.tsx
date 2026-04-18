"use client";
import MainLayout from "@/components/MainLayout";
import { Brain, Heart, Compass, Users, ArrowRight, Sparkles, ChevronDown, ChevronUp, MessageCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const moodOptions = [
  { emoji: "😄", label: "開心", color: "from-green-400 to-emerald-500", bg: "bg-green-50", border: "border-green-200", text: "text-green-600" },
  { emoji: "😊", label: "平静", color: "from-blue-400 to-cyan-500", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-600" },
  { emoji: "😰", label: "緊張", color: "from-yellow-400 to-amber-500", bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-600" },
  { emoji: "😢", label: "傷心", color: "from-indigo-400 to-violet-500", bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-600" },
  { emoji: "😤", label: "生氣", color: "from-red-400 to-rose-500", bg: "bg-red-50", border: "border-red-200", text: "text-red-600" },
];

const wellbeingTopics = [
  {
    icon: Heart,
    title: "心理發展",
    emoji: "💜",
    gradient: "from-pink-500 to-rose-600",
    accentColor: "text-pink-600",
    bgLight: "bg-pink-50",
    borderColor: "border-pink-200",
    content: [
      {
        heading: "0-6歲：情緒基礎關鍵期",
        body: "幼兒階段是情商發育的黃金期。嬰兒通過「情緒同步」學習情緒調節——當主要照顧者能回應嬰兒的需求並表現出穩定情緒時，嬰兒的大腦會建立安全依附基礎。2至3歲幼兒開始出現「情緒爆發」，這是因為前額葉（控制衝動的腦區）尚未發育完全，並非孩子「故意扭計」。家長的正確應對是：先命名情緒（「我知道你很生氣」），再設定界限（「但你不可以打人」），最後提供替代方案（「你可以大力抱著這個公仔」）。"
      },
      {
        heading: "6-12歲：社交技巧快速發展期",
        body: "小學階段孩子開始建立同儕關係，友誼質量直接影響心理健康。此時孩子會經歷「友誼失落」帶來的真實傷痛，家長不宜輕視說「同學唔鐘意你就算啦」。建議教導孩子「3R原則」：Recognize（辨識情緒）、Regulate（調節情緒）、Relate（人際連結）。同時，幫助孩子理解並尊重個體差異——有人喜歡踢足球，有人喜歡看書，都是正常的。這個階段建立的自尊心，會成為青少年期面對風浪的心理緩衝墊。"
      },
      {
        heading: "自尊心 vs 自我效能感",
        body: "「你真係好叻！」是很多家長的口頭禪，但空洞的讚美反而可能造成「虛假自尊」。研究顯示，真正保護孩子心理健康的是「自我效能感」——相信自己有能力透過努力達成目標。家長應多用「過程讚美」：「我見到你今次好努力準備今次考試，呢個態度好正！」而非「結果讚美」：「你係最叻！」。同時，容許孩子失敗，讓他們知道「失敗係學習嘅一部分」，才能建立真正有韌性的心理質素。"
      }
    ]
  },
  {
    icon: Compass,
    title: "青春期導航",
    emoji: "🌟",
    gradient: "from-orange-500 to-amber-600",
    accentColor: "text-orange-600",
    bgLight: "bg-orange-50",
    borderColor: "border-orange-200",
    content: [
      {
        heading: "青春期的大腦革命",
        body: "青春期並非只是「反叛期」，而是大腦進行「修剪」（pruning）的重要階段——用進廢退的神經連接被削弱，而常用的連接被強化。這解釋了為何青少年傾向即時滿足（邊緣系統活躍），而自制力較弱（前額葉尚未發育完全，通常要到25歲才完全成熟）。家長需要理解：子女的「唔聽話」可能不是故意的，而是大腦神經生理髮展的必然過程。給予他們更多自主空間，同時保持開放溝通渠道，比強硬管教更有效。"
      },
      {
        heading: "身體變化的心理調適",
        body: "香港女生平均9-10歲開始胸部發育，男生則約10-11歲睪丸增大。早於或晚於這個時間都可能造成心理壓力。建議家長提前用正向、科學的態度與孩子談論身體變化，避免他們從網上錯誤來源獲得資訊。月經來潮、勃起、夢遺等話題，應該在發生的自然時機以平常心談論，而非刻意迴避。當孩子觉得可以和家長談這些話題時，他們在面對更大挑戰（如校園欺凌、朋輩壓力）時也會更願意求助。"
      },
      {
        heading: "建立健康的性別認同",
        body: "青春期是性別認同探索的時期。部分青少年可能對自己的性別角色感到困惑或掙扎，這是完全正常的發展過程，家長的反應至關重要。不論孩子的性別取向如何，給予無條件的愛和接納是最重要的。研究顯示，感受到家庭支持的LGBTQ+青少年，心理健康狀況顯著好於缺乏支持的同齡人。如家長感到困惑或需要指引，可尋求學校社工或專業機構協助。记住：你的孩子需要的是一個安全的家，而不是一個完美的答案。"
      }
    ]
  },
  {
    icon: Users,
    title: "未來素養",
    emoji: "🚀",
    gradient: "from-violet-500 to-purple-600",
    accentColor: "text-violet-600",
    bgLight: "bg-violet-50",
    borderColor: "border-violet-200",
    content: [
      {
        heading: "財商教育：從紅封包開始",
        body: "香港孩子普遍在過年時收到大量利是錢，但很少有系統的理財教育。建議按年齡階段教授：金錢的用途（4-6歲）、储蓄與消费（7-10歲）、先储蓄後消費、延遲滿足（11-13歲）、投資概念、風險與回報（14歲以上）。可給孩子開立自己的銀行戶口，讓他們親身體驗複利效應。重要的是教導「需要 vs 想要」的分辨能力，以及理解廣告和消費主義的運作方式，讓孩子成為金錢的主人而非奴隸。"
      },
      {
        heading: "數碼公民教育",
        body: "Z世代孩子從小接觸電子屏幕，數碼素養和網絡安全意識必須從小培養。基礎技能包括：保護個人私隱（不隨意透露地址電話）、識別網絡謠言和假新聞、理解「網上留言有後續」——任何在網上發布的內容都可能永久留存並影響未來。青少年應了解網絡性剝削、網絡欺凌的法律和心理後果。建議家長與孩子訂立「家庭媒體協議」，包括每日屏幕時間上限、睡前一小時不用電子設備、社交媒體使用規則等，共同商定而非單方面強加。"
      },
      {
        heading: "批判性思考：資訊爆炸時代的生存技能",
        body: "在假新聞和算法推送無處不在的年代，批判性思考比任何時候都更重要。教授孩子「查證三問」：這個資訊從哪裡來？發布者可信嗎？有沒有其他來源可以印證？同時教導他們理解「確認偏誤」——人類傾向接受符合自己既有觀點的資訊，這讓我們容易被困在「資訊繭房」中。批判性思考不是懷疑一切，而是對任何資訊保持合理質疑的態度，並願意根據新證據改變想法。這些能力需要家長在日常生活中以身作則、持續引導。"
      }
    ]
  },
  {
    icon: Brain,
    title: "情緒管理",
    emoji: "🧠",
    gradient: "from-cyan-500 to-teal-600",
    accentColor: "text-cyan-600",
    bgLight: "bg-cyan-50",
    borderColor: "border-cyan-200",
    content: [
      {
        heading: "情緒調節的三大工具",
        body: "情緒調節不等於壓抑情緒，而是健康地表達和處理。第一個工具是「身體調節」：當情緒激動時，專注深呼吸（4-7-8呼吸法：吸4秒、屏息7秒、呼8秒）能直接激活副交感神經，降低心率和血壓。第二個工具是「認知重評」：在情緒高峰期問自己「這件事一年後還重要嗎？」，幫助拉開心理距離。第三個工具是「行為表達」：通過運動、寫日記、與信任的人傾訴等方式將情緒外化，而非內壓。建議家長與孩子一起練習這些技巧，效果更佳。"
      },
      {
        heading: "關注青少年抑鬱徵兆",
        body: "香港青少年抑鬱症發病率持續上升，但求助率偏低。家長應留意以下徵兆：情緒持續低落超過兩週、對原本感興趣的事物失去興趣、睡眠和食欲明顯改變、經常說「好攰」或「冇意思」、自我價值感低（「我係垃圾」、「冇人想要我」）、集中力和成績明顯下降、涉及自殘或死亡話題。如發現以上徵兆，應立即尋求專業協助，同時確保家裡環境安全。請記住：詢問孩子是否有自殺念頭不會「提示」他們這麼做，相反，明確表達關心和提供支援能大大降低風險。"
      },
      {
        heading: "家長的情緒修煉",
        body: "孩子的情緒調節能力，很大程度上是從家長身上「下載」的。當家長能在自己情緒激動時先深呼吸、離開現場、稍後再處理，孩子就會學習到這種模式而非「以情緒回應情緒」。接納自己的不完美也很重要——每個家長都會有失控的時候，關鍵是事後修復：向孩子道歉、解釋當時的感受、討論下次可以怎樣做。這個「修復」過程本身，就是最好的情商教材。另外，照顧者自身的心理健康同樣重要——只有當家長自己有足夠的心理資源，才能更好地支持孩子。"
      }
    ]
  }
];

function MoodCheckIn() {
  const [selected, setSelected] = useState<string | null>(null);
  const [showTips, setShowTips] = useState(false);

  const tips: Record<string, string[]> = {
    "😄": ["太好了！今天心情指數滿分 🌟 試試把這份好心情分享給身邊的人", "可以把讓你開心的事記下來，心情不好的時候翻出來看", "開心時也別忘了關心身邊的人喔"],
    "😊": ["平靜是最好的狀態！可以趁這個時候做一些需要專注的事", "試試5-4-3-2-1 grounding exercise：説出5樣看到的、4樣摸到的、3樣聽到的…", "保持這個狀態，明天也會一樣好"],
    "😰": ["深呼吸，4-7-8：吸4秒、屏息7秒、呼8秒，重複3次", "把令你緊張的事寫下來，很多時候寫下來就不那麼可怕了", "記住：大多數令你緊張的事，最後都沒有發生的"],
    "😢": ["傷心時允許自己哭，哭完會舒服一點的", "試試找信任的人聊聊，或者寫下你的感受", "如果傷心持續超過兩週，建議找大人或專業人士聊聊"],
    "😤": ["生氣時千萬别做决定，先離開現場，深呼吸冷靜下來", "可以大力抱着枕頭、跑步或打枕頭來發洩", "試試在心裏數到10，然後問自己：這件事值得我這麼生氣嗎？"],
  };

  const handleSelect = (emoji: string) => {
    setSelected(emoji);
    setShowTips(false);
    setTimeout(() => setShowTips(true), 300);
  };

  const selectedMood = moodOptions.find(m => m.emoji === selected);

  return (
    <div className="bg-gradient-to-br from-pink-50 to-violet-50 rounded-3xl p-8 border-2 border-pink-100 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🌈</span>
        <div>
          <h3 className="text-xl font-black text-gray-900">今日心情測驗 🌟</h3>
          <p className="text-sm text-gray-500 font-medium">點擊選擇你现在的感受</p>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        {moodOptions.map((mood) => (
          <button
            key={mood.emoji}
            onClick={() => handleSelect(mood.emoji)}
            className={`flex flex-col items-center gap-1 px-4 py-3 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${selected === mood.emoji ? `${mood.bg} ${mood.border} ${mood.text} border-2 shadow-md` : "bg-white border-gray-100 text-gray-500 hover:border-pink-200"}`}
          >
            <span className="text-3xl">{mood.emoji}</span>
            <span className="text-xs font-bold">{mood.label}</span>
          </button>
        ))}
      </div>

      <div className={`transition-all duration-500 mt-6 ${showTips && selected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        {selected && selectedMood && (
          <div className={`rounded-2xl p-5 ${selectedMood.bg} border ${selectedMood.border}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{selected}</span>
              <span className={`font-black ${selectedMood.text}`}>{selectedMood.label}的建議 🌟</span>
            </div>
            <ul className="space-y-2">
              {tips[selected]?.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700 text-sm font-medium">
                  <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${selectedMood.text}`} />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function AccordionItem({ topic }: { topic: typeof wellbeingTopics[0] }) {
  const [open, setOpen] = useState(false);
  const Icon = topic.icon;

  return (
    <div className="bg-white rounded-2xl shadow-md border-2 border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between p-6 text-left bg-gradient-to-r ${topic.gradient} bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500`}
      >
        <div className="flex items-center gap-4">
          <span className="text-3xl">{topic.emoji}</span>
          <span className="text-white font-black text-lg drop-shadow">{topic.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/60 text-sm font-bold">{open ? "收起" : "展開"}</span>
          <div className={`w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
            {open ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4 text-white" />}
          </div>
        </div>
      </button>

      <div className={`transition-all duration-500 ease-in-out ${open ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="p-6 space-y-8 bg-white">
          {topic.content.map((section, idx) => (
            <div key={idx}>
              <h4 className={`text-lg font-black ${topic.accentColor} mb-3 flex items-center gap-2`}>
                <span className="w-2 h-2 rounded-full bg-current opacity-40" />
                {section.heading}
              </h4>
              <p className="text-gray-600 leading-relaxed font-medium">{section.body}</p>
              {idx < topic.content.length - 1 && <div className={`h-px ${topic.bgLight} mt-6`} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WellbeingPage() {
  return (
    <MainLayout>
      {/* ═══════════════════════════════════════════ HERO ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-600 via-violet-600 to-purple-700">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl" />
          <div className="absolute top-40 -left-32 w-[500px] h-[500px] bg-pink-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 right-20 w-80 h-80 bg-violet-300/30 rounded-full blur-3xl" />
          <div className="absolute top-16 left-[5%] animate-float text-4xl opacity-70">🧠</div>
          <div className="absolute top-24 right-[10%] animate-float-delayed text-3xl opacity-60">💜</div>
          <div className="absolute top-40 left-[15%] animate-float-delayed-2 text-3xl opacity-50">✨</div>
          <div className="absolute bottom-32 left-[8%] animate-float text-4xl opacity-70">🌟</div>
          <div className="absolute bottom-24 right-[12%] animate-float-delayed text-3xl opacity-60">💪</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-5 py-2.5 rounded-full text-sm font-bold mb-6 shadow-xl">
                <Brain className="w-4 h-4 text-pink-300" />
                身心健康同等重要
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                心靈與
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-200 to-yellow-200">
                  軟技能 🌟
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-10 leading-relaxed font-medium">
                心理發展 · 青春期導航 · 未來素養
                <br />陪伴孩子全面成長 ✨
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/wellbeing"
                  className="group inline-flex items-center gap-3 bg-white text-pink-600 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
                >
                  <Brain className="w-6 h-6" />
                  探索成長
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:flex justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-violet-400 rounded-full opacity-40 blur-3xl" />
                <div className="absolute inset-8 bg-white/95 backdrop-blur rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-pink-500 via-violet-500 to-purple-500 rounded-3xl flex items-center justify-center mb-6 shadow-xl">
                    <span className="text-6xl">🧠</span>
                  </div>
                  <div className="text-2xl font-black text-gray-800 mb-1">心靈成長</div>
                  <div className="text-sm text-gray-500 font-medium">由內而外</div>
                </div>
                <div className="absolute -top-2 left-4 bg-white rounded-2xl p-4 shadow-xl animate-float" style={{ animationDuration: "3s" }}>
                  <span className="text-3xl">💜</span>
                </div>
                <div className="absolute top-10 -right-4 bg-pink-100 rounded-2xl p-4 shadow-xl animate-float" style={{ animationDuration: "4s", animationDelay: "1s" }}>
                  <span className="text-3xl">🌟</span>
                </div>
                <div className="absolute -bottom-2 left-12 bg-violet-100 rounded-2xl p-4 shadow-xl animate-float" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}>
                  <span className="text-3xl">✨</span>
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
      <section className="py-20 bg-gradient-to-b from-white to-pink-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
              🌈 四大成長領域
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              培育完整人格
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              除了學業成績，我們更關心孩子的內心世界
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Heart, title: "心理發展", desc: "社交技巧訓練、情緒監管、友誼建立", gradient: "from-pink-500 to-rose-600", iconColor: "text-pink-500", emoji: "💜", highlights: ["情商訓練", "情緒管理", "社交技巧"] },
              { icon: Compass, title: "青春期導航", desc: "面對生理變化、第二性徵發育的心理調適", gradient: "from-orange-500 to-amber-600", iconColor: "text-orange-500", emoji: "🌟", highlights: ["生理變化適應", "心理調適指南", "家長溝通技巧"] },
              { icon: Users, title: "未來素養", desc: "財商教育、數碼公民教育、批判性思考", gradient: "from-violet-500 to-purple-600", iconColor: "text-violet-500", emoji: "🚀", highlights: ["理財教育", "數碼素養", "批判思維"] },
              { icon: Brain, title: "情緒管理", desc: "認識情緒、調節壓力、建立心理韌性", gradient: "from-cyan-500 to-teal-600", iconColor: "text-cyan-500", emoji: "🧠", highlights: ["情緒詞彙", "壓力調節", "心理韌性"] },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-pink-100 overflow-hidden">
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
                        <span className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
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

      {/* ═══════════════════════════════════════════ MOOD CHECK-IN ═══════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-b from-white to-violet-50/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <MoodCheckIn />
        </div>
      </section>

      {/* ═══════════════════════════════════════════ TOPICS CONTENT ═══════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-b from-violet-50/30 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
              📚 深入閱讀
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              成長路上，你需要知道的事
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              點擊各主題展開深入內容，陪伴孩子走過每個成長階段
            </p>
          </div>

          <div className="space-y-4">
            {wellbeingTopics.map((topic) => (
              <AccordionItem key={topic.title} topic={topic} />
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-12 bg-violet-50 border border-violet-200 rounded-2xl p-6">
            <p className="text-sm text-violet-700 font-medium leading-relaxed">
              ⚠️ 以上資訊僅供參考，不能取代專業心理諮詢或醫療意見。如孩子出現持續情緒問題、自殘傾向或任何讓家長擔心的情況，請立即尋求學校社工或專業心理諮詢服務。香港24小時心理支援熱線：2382 3222（撒瑪利亞防止自殺會）。
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ CTA ═══════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-pink-600 via-violet-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-5 py-2.5 rounded-full text-sm font-bold mb-8">
            <Sparkles className="w-4 h-4" />
            立即探索
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            了解自己，從今天開始 💜
          </h2>
          <p className="text-xl text-white/80 mb-10 font-medium">
            孩子每一個情緒信號，都是成長的禮物
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/assessment"
              className="group inline-flex items-center gap-3 bg-white text-pink-600 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
            >
              <Users className="w-6 h-6" />
              性格評估
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
