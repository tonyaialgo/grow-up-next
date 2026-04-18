"use client";

import MainLayout from "@/components/MainLayout";
import { Heart, Brain, Activity, Shield, ArrowRight, Sparkles, Utensils, Moon, TrendingUp, Smile, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const features = [
  {
    icon: Activity,
    title: "AI 健康評估",
    desc: "根據香港衛生署生長圖表，輸入身高體重即可獲得專業評估",
    gradient: "from-cyan-500 to-emerald-500",
    iconColor: "text-cyan-500",
    emoji: "🤖",
    highlights: ["對標衛生署生長圖表", "智能生長警報", "個人化建議"],
  },
  {
    icon: Brain,
    title: "健康百科",
    desc: "兒童營養、睡眠科學、生長議題專業資訊",
    gradient: "from-emerald-500 to-teal-500",
    iconColor: "text-emerald-500",
    emoji: "📖",
    highlights: ["專業資訊審核", "家長指南", "健康食譜"],
  },
  {
    icon: Heart,
    title: "生長曲線追蹤",
    desc: "記錄孩子身高體重，畫出連續生長走勢圖",
    gradient: "from-pink-500 to-rose-500",
    iconColor: "text-pink-500",
    emoji: "📈",
    highlights: ["圖表化追蹤", "歷史記錄", "對比同齡孩子"],
  },
  {
    icon: Shield,
    title: "智能警報",
    desc: "當生長低於第3百分位時自動提醒家長",
    gradient: "from-orange-500 to-amber-500",
    iconColor: "text-orange-500",
    emoji: "🚨",
    highlights: ["及早發現問題", "及時就醫建議", "專家諮詢"],
  },
];

const healthTopics = [
  {
    icon: Utensils,
    title: "兒童營養",
    emoji: "🥗",
    gradient: "from-green-400 to-emerald-500",
    bgLight: "bg-green-50",
    borderColor: "border-green-200",
    accentColor: "text-green-600",
    content: [
      {
        heading: "均衡飲食金字塔",
        body: "根據衛生防護中心的建議，兒童每日飲食應包含五大營養類別：穀物類、蔬菜類、水果類、肉類及蛋白質類、以及奶類及代替品。4至6歲兒童每日建議攝取約1½至2碗穀物，蔬菜及水果各不少於1份，肉類約2至3両。家長可運用「我的餐盤」概念，以半盤蔬菜水果、 quarter 蛋白質、quarter 穀物的比例分配每餐，既直觀又易於執行。"
      },
      {
        heading: "常見營養陷阱",
        body: "很多家長誤以為孩子愛吃就是健康，忽略了隱形糖分和鈉含量的問題。果汁看似健康，實則缺乏纖維且糖分極高，一杯250ml橙汁已含約25克遊離糖。另一常見問題是過度依賴加工食品，如香腸、午餐肉等，這些加工肉類已被世衛列為一級致癌物。建議以原食物形態攝取營養，讓孩子多吃新鮮蔬果、全穀物和新鮮肉類。"
      },
      {
        heading: "補充足夠鈣質與維生素D",
        body: "香港兒童普遍維生素D不足，主要因為室內活動多、日曬時間少。維生素D是鈣質吸收的關鍵，缺乏會影響骨骼礦化和身高發展。建議每天讓孩子在陽光下活動15至20分鐘（上午10時至下午3時為佳），並通過食物補充，如三文魚、蛋黃、維生素D強化奶製品。如懷疑缺乏，可諮詢醫生後考慮補充劑。"
      }
    ]
  },
  {
    icon: Moon,
    title: "睡眠科學",
    emoji: "🌙",
    gradient: "from-indigo-400 to-purple-500",
    bgLight: "bg-indigo-50",
    borderColor: "border-indigo-200",
    accentColor: "text-indigo-600",
    content: [
      {
        heading: "各年齡所需睡眠時數",
        body: "美國國家睡眠基金會建議：3至5歲幼兒每日需要10至13小時（含午睡），6至13歲學童需要9至11小時，14至17歲青少年需要8至10小時。香港學童普遍睡眠不足，功課壓力和課外活動是兩大主因。睡眠不足會直接影響生長激素分泌——生長激素在深層睡眠（入睡後60至90分鐘）分泌最旺盛，因此保證充足睡眠比補充品更有效。"
      },
      {
        heading: "建立良好睡眠習慣",
        body: "固定的睡眠時間是優質睡眠的基礎，即使週末也不宜相差超過1小時。睡前一小時應避免屏幕時間，電子設備發出的藍光會抑制褪黑激素分泌，令孩子難以入睡。建議建立「睡眠儀式」：如洗澡→換睡衣→刷牙→講故事→關燈，讓孩子的身體和大脑自然進入睡眠模式。睡房應保持黑暗、安靜及適中溫度（18-22°C）。"
      },
      {
        heading: "常見睡眠問題與解決方法",
        body: "幼兒常見的入睡抗拒和夜醒問題，往往與家長的應對方式有關。避免用奶睡或抱睡的方式讓孩子過度依賴外界安撫入睡，否則孩子半夜醒來後無法自行重新入睡。對於青少年失眠，認知行為治療（CBT-I）比藥物更為首選。如孩子持續出現睡眠問題，建議記錄兩週睡眠日記後諮詢醫生或睡眠專家。"
      }
    ]
  },
  {
    icon: TrendingUp,
    title: "生長發育",
    emoji: "📈",
    gradient: "from-amber-400 to-orange-500",
    bgLight: "bg-amber-50",
    borderColor: "border-amber-200",
    accentColor: "text-amber-600",
    content: [
      {
        heading: "生長激素與影響因素",
        body: "兒童身高約60%至80%由遺傳決定，其餘受環境和營養影響。遺傳身高可通過父母身高估算：男孩預測身高 =（父親身高 + 母親身高 + 13）÷ 2 ± 5cm；女孩 =（父親身高 + 母親身高 - 13）÷ 2 ± 5cm。生長激素在睡眠時分泌最旺盛，因此睡眠比運動更直接影響身高。甲狀腺功能減退和慢性疾病也會抑制生長，如有疑慮應及早檢查。"
      },
      {
        heading: "生長突增期的營養需求",
        body: "兒童在嬰兒期和青春期有兩個生長突增期。青春期前（女孩約10-14歲，男孩約12-16歲）每年可長高6至12厘米。此時對蛋白質、鈣、鋅的需求大增——蛋白質是肌肉和骨骼構建的原料，鈣是骨骼礦化的關鍵，鋅則參與細胞分裂。每天需要攝入約50克蛋白質，相當於約200克瘦肉或兩杯牛奶。運動方面，跳繩、籃球、游泳等垂直跳躍運動對刺激軟骨生長最為有效。"
      },
      {
        heading: "何時需要進一步評估",
        body: "一般來說，孩子的生長速度（每年身高增長）比絕對身高更重要。如孩子在3歲後每年增高不足5厘米，或身高低於同齡同性別兒童第3百分位，建議諮詢兒科醫生。另一個關鍵指標是「骨齡」——通過左手X光片評估骨骼成熟程度，能更準確預測未來身高和生長潛力。早發現問題，及早介入，效果最佳。"
      }
    ]
  },
  {
    icon: Smile,
    title: "心理健康",
    emoji: "💜",
    gradient: "from-pink-400 to-rose-500",
    bgLight: "bg-pink-50",
    borderColor: "border-pink-200",
    accentColor: "text-pink-600",
    content: [
      {
        heading: "識別兒童焦慮與壓力信號",
        body: "兒童焦慮的表現與成人不同，常見症狀包括：反覆出現的身體不適（頭痛、胃痛但無器質性病變）、睡眠問題、分離焦慮、脾氣暴躁或退化行為（如已戒尿片的孩子突然尿床）。香港學童壓力指數高企，升小呈分試、升中呈分試令孩子過早承受競爭壓力。家長應每日抽出15分鐘「優質時間」，以不批判的態度聆聽孩子分享感受，讓他們感受到被接納。"
      },
      {
        heading: "建立孩子的情緒詞彙",
        body: "很多孩子鬧情緒，是因為不懂得用言語表達感受。家長可以從幼兒期開始教授情緒詞彙：開心、傷心、害怕、生氣、失望、緊張……每種情緒都有程度之分（「有點生氣」vs「非常生氣」）。當孩子能命名情緒時，大腦的理性區域（前額葉）就會啟動，自然降低情緒爆發的強度。這是情商培養的基礎，也為日後青春期的人際溝通打下根基。"
      },
      {
        heading: "何時尋求專業協助",
        body: "當孩子的情緒或行為問題持續超過兩週，並明顯影響日常生活（如上學、社交、家庭生活）、學業表現或睡眠飲食時，應考慮尋求專業協助。可先諮詢學校社工或家庭教育主任，必要時再轉介至精神科或臨床心理學家。家長自身的心理健康同樣重要——照顧好自己，才能更好陪伴孩子成長。香港有不少支援機構提供兒童及青少年心理健康服務，切勿諱疾忌醫。"
      }
    ]
  }
];

function AccordionItem({ title, emoji, gradient, number, children }: {
  title: string; emoji: string; gradient: string; number: string; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`bg-white rounded-2xl shadow-md border-2 border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between p-6 text-left bg-gradient-to-r ${gradient} bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all duration-500`}
      >
        <div className="flex items-center gap-4">
          <span className="text-3xl">{emoji}</span>
          <span className="text-white font-black text-lg drop-shadow">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/60 text-sm font-bold">{number}</span>
          <div className={`w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
            <ChevronDown className="w-4 h-4 text-white" />
          </div>
        </div>
      </button>
      <div className={`transition-all duration-500 ease-in-out ${open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="p-6 space-y-8 bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}

function HealthContentSection({ topic }: { topic: typeof healthTopics[0] }) {
  return (
    <AccordionItem title={topic.title} emoji={topic.emoji} gradient={topic.gradient} number="展開">
      {topic.content.map((section, idx) => (
        <div key={idx}>
          <h4 className={`text-lg font-black ${topic.accentColor} mb-3 flex items-center gap-2`}>
            <span className={`w-2 h-2 rounded-full bg-current opacity-40`} />
            {section.heading}
          </h4>
          <p className="text-gray-600 leading-relaxed font-medium">{section.body}</p>
          {idx < topic.content.length - 1 && <div className={`h-px ${topic.bgLight} mt-6`} />}
        </div>
      ))}
    </AccordionItem>
  );
}

export default function HealthPage() {
  return (
    <MainLayout>
      {/* ═══════════════════════════════════════════ HERO ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-cyan-600 to-blue-600">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl" />
          <div className="absolute top-40 -left-32 w-[500px] h-[500px] bg-green-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 right-20 w-80 h-80 bg-cyan-300/30 rounded-full blur-3xl" />
          <div className="absolute top-16 left-[5%] animate-float text-4xl opacity-70">❤️</div>
          <div className="absolute top-24 right-[10%] animate-float-delayed text-3xl opacity-60">💪</div>
          <div className="absolute top-40 left-[15%] animate-float-delayed-2 text-3xl opacity-50">🤱</div>
          <div className="absolute bottom-32 left-[8%] animate-float text-4xl opacity-70">🧬</div>
          <div className="absolute bottom-24 right-[12%] animate-float-delayed text-3xl opacity-60">🌱</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-5 py-2.5 rounded-full text-sm font-bold mb-6 shadow-xl">
                <Heart className="w-4 h-4 text-rose-300" />
                關注孩子健康
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                全方位
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-cyan-200 to-emerald-200">
                  健康中心 ❤️
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-10 leading-relaxed font-medium">
                AI 健康評估 · 生長追蹤 · 專業健康資訊
                <br />陪伴孩子健康成長每一步 👶
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/assessment"
                  className="group inline-flex items-center gap-3 bg-white text-emerald-600 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
                >
                  <Activity className="w-6 h-6" />
                  AI 健康評估
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:flex justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-full opacity-40 blur-3xl" />
                <div className="absolute inset-8 bg-white/95 backdrop-blur rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 rounded-3xl flex items-center justify-center mb-6 shadow-xl">
                    <span className="text-6xl">❤️</span>
                  </div>
                  <div className="text-2xl font-black text-gray-800 mb-1">健康成長</div>
                  <div className="text-sm text-gray-500 font-medium">由 AI 守護</div>
                </div>
                <div className="absolute -top-2 left-4 bg-white rounded-2xl p-4 shadow-xl animate-float" style={{ animationDuration: "3s" }}>
                  <span className="text-3xl">🤖</span>
                </div>
                <div className="absolute top-10 -right-4 bg-cyan-100 rounded-2xl p-4 shadow-xl animate-float" style={{ animationDuration: "4s", animationDelay: "1s" }}>
                  <span className="text-3xl">📊</span>
                </div>
                <div className="absolute -bottom-2 left-12 bg-green-100 rounded-2xl p-4 shadow-xl animate-float" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}>
                  <span className="text-3xl">📈</span>
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
      <section className="py-20 bg-gradient-to-b from-white to-cyan-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
              🏥 四大健康功能
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              科技守護健康
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              先進 AI 技術 + 專業醫學數據，為孩子成長把關
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-cyan-100 overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-br ${item.gradient}`} />
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
                  <div className="relative mb-6 mt-4">
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`w-10 h-10 ${item.iconColor}`} />
                    </div>
                    <div className="absolute -top-2 -right-2 text-3xl animate-bounce-gentle">{item.emoji}</div>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-6 font-medium">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
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

      {/* ═══════════════════════════════════════════ 健康百科 CONTENT ═══════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-b from-cyan-50/30 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
              📖 健康百科
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              專業健康資訊
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              點擊各主題展開深入閱讀，內容由專業資料審核
            </p>
          </div>

          <div className="space-y-4">
            {healthTopics.map((topic) => (
              <HealthContentSection key={topic.title} topic={topic} />
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <p className="text-sm text-blue-700 font-medium leading-relaxed">
              ⚠️ 以上資訊僅供參考，不能取代專業醫療意見。如有任何健康疑慮，請諮詢您的家庭醫生或專科醫護人員。如發現孩子生長問題（身高低於第3百分位、生長速度過慢或過快），建議及早向兒科醫生求診。
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ CTA ═══════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 via-cyan-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-5 py-2.5 rounded-full text-sm font-bold mb-8">
            <Sparkles className="w-4 h-4" />
            立即開始
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            5秒知道孩子生長狀況
          </h2>
          <p className="text-xl text-white/80 mb-10 font-medium">
            AI 健康評估，根據香港衛生署生長圖表專業分析
          </p>
          <Link
            href="/assessment"
            className="group inline-flex items-center gap-3 bg-white text-emerald-600 px-10 py-5 rounded-2xl font-black text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
          >
            <Activity className="w-7 h-7" />
            開始 AI 健康評估
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
