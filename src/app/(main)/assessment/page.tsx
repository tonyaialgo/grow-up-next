"use client";

import { useState, useRef } from "react";

import MainLayout from "@/components/MainLayout";
import { Activity, ArrowRight, Shield, Loader2, ChevronLeft, Download, Share2 } from "lucide-react";

// HK Growth Chart Data (Boys 3-18 years) - Height-for-age percentiles (cm)
const BOYS_HEIGHT = {
  age: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  p3:   [89.5, 95.8, 101.4, 106.6, 111.3, 115.6, 119.6, 123.4, 127.3, 131.5, 136.0, 141.2, 146.5, 151.5, 155.6, 158.8],
  p10:  [91.6, 98.0, 103.8, 109.1, 113.9, 118.4, 122.6, 126.7, 130.8, 135.3, 140.3, 146.0, 151.6, 156.5, 160.4, 163.3],
  p25:  [93.8, 100.3, 106.3, 111.7, 116.6, 121.2, 125.6, 129.9, 134.3, 139.2, 144.8, 151.0, 156.8, 161.6, 165.3, 168.0],
  p50:  [96.1, 102.7, 108.9, 114.4, 119.5, 124.2, 128.9, 133.4, 138.1, 143.4, 149.6, 156.3, 162.2, 166.9, 170.3, 172.9],
  p75:  [98.4, 105.1, 111.5, 117.1, 122.4, 127.2, 132.1, 137.0, 141.9, 147.7, 154.5, 161.7, 167.6, 172.0, 175.3, 177.7],
  p90:  [100.4, 107.2, 113.7, 119.4, 124.9, 129.9, 135.1, 140.3, 145.5, 151.9, 159.3, 166.8, 172.6, 176.7, 179.7, 182.0],
  p97:  [102.5, 109.4, 116.0, 121.8, 127.5, 132.8, 138.3, 143.8, 149.3, 156.3, 164.3, 172.1, 177.8, 181.7, 184.5, 186.6],
};

const GIRLS_HEIGHT = {
  age: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  p3:   [88.2, 94.6, 100.3, 105.6, 110.5, 115.0, 119.4, 123.8, 128.6, 133.5, 138.0, 141.8, 144.7, 146.6, 147.9, 148.6],
  p10:  [90.2, 96.7, 102.6, 108.0, 113.0, 117.7, 122.4, 127.1, 132.3, 137.6, 142.4, 146.0, 148.8, 150.6, 151.8, 152.4],
  p25:  [92.3, 98.9, 105.0, 110.6, 115.8, 120.6, 125.6, 130.7, 136.3, 142.0, 147.0, 150.4, 153.1, 154.8, 155.9, 156.4],
  p50:  [94.6, 101.4, 107.7, 113.5, 118.9, 123.9, 129.2, 134.7, 140.7, 146.7, 151.9, 155.1, 157.7, 159.3, 160.2, 160.7],
  p75:  [97.0, 103.9, 110.5, 116.5, 122.2, 127.4, 133.0, 139.1, 145.5, 151.7, 157.1, 160.0, 162.4, 163.9, 164.7, 165.1],
  p90:  [99.1, 106.2, 113.0, 119.2, 125.1, 130.5, 136.5, 143.1, 149.8, 156.1, 161.5, 164.2, 166.3, 167.7, 168.4, 168.8],
  p97:  [101.1, 108.3, 115.4, 121.8, 128.1, 133.7, 140.2, 147.4, 154.4, 160.7, 166.0, 168.4, 170.2, 171.5, 172.1, 172.5],
};

const BOYS_BMI = {
  age: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  p3:   [13.9, 13.6, 13.5, 13.6, 13.8, 14.0, 14.2, 14.4, 14.6, 14.8, 15.1, 15.5, 15.9, 16.2, 16.4, 16.6],
  p10:  [14.6, 14.3, 14.1, 14.2, 14.4, 14.6, 14.8, 15.1, 15.3, 15.6, 15.9, 16.3, 16.7, 17.1, 17.4, 17.6],
  p25:  [14.9, 14.6, 14.4, 14.4, 14.6, 14.8, 15.1, 15.4, 15.7, 16.0, 16.5, 16.9, 17.3, 17.7, 18.0, 18.3],
  p50:  [15.6, 15.3, 15.2, 15.2, 15.4, 15.6, 15.9, 16.2, 16.5, 16.8, 17.3, 17.8, 18.3, 18.7, 19.0, 19.3],
  p75:  [16.2, 15.9, 15.7, 15.7, 15.9, 16.1, 16.5, 16.8, 17.2, 17.6, 18.1, 18.7, 19.2, 19.7, 20.0, 20.4],
  p90:  [16.8, 16.5, 16.3, 16.3, 16.5, 16.8, 17.2, 17.6, 18.1, 18.7, 19.3, 20.0, 20.6, 21.2, 21.6, 22.0],
  p97:  [17.8, 17.4, 17.3, 17.4, 17.6, 17.9, 18.3, 18.7, 19.2, 19.9, 20.8, 21.8, 22.7, 23.4, 24.0, 24.6],
};

const GIRLS_BMI = {
  age: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  p3:   [13.5, 13.2, 13.0, 13.0, 13.1, 13.2, 13.4, 13.7, 14.0, 14.4, 14.8, 15.3, 15.7, 16.1, 16.4, 16.6],
  p10:  [14.2, 13.8, 13.6, 13.6, 13.7, 13.9, 14.2, 14.6, 15.0, 15.5, 16.0, 16.5, 17.0, 17.4, 17.7, 17.9],
  p25:  [14.7, 14.3, 14.1, 14.1, 14.3, 14.5, 14.9, 15.3, 15.8, 16.4, 16.9, 17.5, 18.0, 18.5, 18.8, 19.1],
  p50:  [15.2, 14.8, 14.7, 14.7, 14.8, 15.0, 15.3, 15.7, 16.2, 16.8, 17.4, 18.0, 18.6, 19.0, 19.3, 19.6],
  p75:  [15.8, 15.4, 15.3, 15.3, 15.5, 15.7, 16.1, 16.6, 17.2, 17.9, 18.6, 19.3, 19.9, 20.4, 20.8, 21.2],
  p90:  [16.5, 16.1, 15.9, 16.0, 16.2, 16.5, 17.0, 17.6, 18.3, 19.1, 19.9, 20.7, 21.4, 22.0, 22.4, 22.8],
  p97:  [17.4, 16.9, 16.7, 16.8, 17.0, 17.3, 17.7, 18.3, 19.0, 19.8, 20.7, 21.6, 22.4, 23.1, 23.7, 24.2],
};

function calcExpectedHeight(fatherHeight: number, motherHeight: number, gender: "boy" | "girl"): number {
  const mid = (fatherHeight + motherHeight) / 2;
  return gender === "boy" ? (mid + 6.5) : (mid - 6.5);
}

function getHeightPercentile(height: number, age: number, gender: "boy" | "girl"): number {
  const data = gender === "boy" ? BOYS_HEIGHT : GIRLS_HEIGHT;
  const idx = data.age.findIndex((a) => a >= age);
  const i = idx === -1 ? data.age.length - 1 : idx;
  if (height < data.p3[i]) return 1;
  if (height < data.p10[i]) return 5;
  if (height < data.p25[i]) return 15;
  if (height < data.p50[i]) return 35;
  if (height < data.p75[i]) return 65;
  if (height < data.p90[i]) return 82;
  if (height < data.p97[i]) return 94;
  return 99;
}

function getPercentileLabel(p: number): string {
  if (p <= 3) return "偏矮，建議關注";
  if (p <= 15) return "偏矮，注意追蹤";
  if (p <= 85) return "正常";
  if (p <= 97) return "偏高";
  return "身高優異";
}

function getBMIPercentile(bmi: number, age: number, gender: "boy" | "girl") {
  const data = gender === "boy" ? BOYS_BMI : GIRLS_BMI;
  const idx = data.age.findIndex((a) => a >= age);
  const i = idx === -1 ? data.age.length - 1 : idx;
  if (bmi < data.p3[i]) return { status: "體重過輕", color: "text-blue-600", bg: "bg-blue-100", p3: data.p3[i], p50: data.p50[i], p97: data.p97[i] };
  if (bmi < data.p25[i]) return { status: "體重偏輕", color: "text-teal-600", bg: "bg-teal-100", p3: data.p3[i], p50: data.p50[i], p97: data.p97[i] };
  if (bmi < data.p75[i]) return { status: "正常體重", color: "text-emerald-600", bg: "bg-emerald-100", p3: data.p3[i], p50: data.p50[i], p97: data.p97[i] };
  if (bmi < data.p90[i]) return { status: "體重偏重", color: "text-amber-600", bg: "bg-amber-100", p3: data.p3[i], p50: data.p50[i], p97: data.p97[i] };
  return { status: "體重過重", color: "text-red-600", bg: "bg-red-100", p3: data.p3[i], p50: data.p50[i], p97: data.p97[i] };
}

function getBMIChartPosition(bmi: number, p3: number, p50: number, p97: number): number {
  if (bmi <= p3) return 5;
  if (bmi >= p97) return 95;
  if (bmi <= p50) return 5 + ((bmi - p3) / (p50 - p3)) * 40;
  return 45 + ((bmi - p50) / (p97 - p50)) * 50;
}

type Result = {
  heightPercentile: number;
  heightStatus: string;
  bmi: number;
  bmiInfo: { status: string; color: string; bg: string; p3: number; p50: number; p97: number };
  bmiChartPos: number;
  expectedHeight: number;
  heightGap: number;
  recommendations: { sleep: string; exercise: string; nutrition: string; diet: string };
  isShortStature: boolean;
  name: string;
  reportDate: string;
};

function analyze(height: number, weight: number, age: number, gender: "boy" | "girl", fatherHeight: number, motherHeight: number, name: string): Result {
  const bmi = weight / ((height / 100) ** 2);
  const hp = getHeightPercentile(height, age, gender);
  const bmiInfo = getBMIPercentile(bmi, age, gender);
  const expected = calcExpectedHeight(fatherHeight, motherHeight, gender);
  const gap = height - expected;
  const isShortStature = hp <= 3;
  const today = new Date();
  const reportDate = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

  const recs = {
    sleep: hp <= 15
      ? `每晚保證 9-11 小時睡眠，特別是深度睡眠時段（22:00-01:00）`
      : `保持每晚 8-10 小時睡眠，有助生長激素分泌`,
    exercise: hp <= 15
      ? `每天跳繩 10-15 分鐘、籃球、游泳等縱向運動，刺激骨骼生長`
      : `每天 1 小時中等強度運動，如游泳、跑步、球類運動`,
    nutrition: hp <= 15
      ? `每日攝取足夠蛋白質（雞蛋 2 個 + 牛奶 500ml + 肉類 150g）`
      : `均衡飲食，每日蔬果 5 份，蛋白質攝取充足`,
    diet: hp <= 15
      ? `建議補充維生素 D + 鈣片，並減少甜食飲料攝取`
      : `減少高糖高脂飲食，保持營養均衡`,
  };

  return {
    heightPercentile: hp,
    heightStatus: getPercentileLabel(hp),
    bmi: Math.round(bmi * 10) / 10,
    bmiInfo,
    bmiChartPos: getBMIChartPosition(bmi, bmiInfo.p3, bmiInfo.p50, bmiInfo.p97),
    expectedHeight: Math.round(expected),
    heightGap: Math.round(gap * 10) / 10,
    recommendations: recs,
    isShortStature,
    name: name || (gender === "boy" ? "小朋友" : "小朋友"),
    reportDate,
  };
}

// PercentileBar with arrow indicator
function PercentileBar({ value }: { value: number }) {
  // Position as percentage (0-100) of the bar width
  const posPercent = Math.min(100, Math.max(0, value));

  return (
    <div className="relative">
      {/* Bar - segments corresponding to percentile ranges */}
      <div className="h-5 rounded-full overflow-hidden flex">
        <div className="h-full w-[3%] bg-red-400" />
        <div className="h-full w-[2%] bg-red-300" />
        <div className="h-full w-[4%] bg-orange-400" />
        <div className="h-full w-[4%] bg-yellow-400" />
        <div className="h-full w-[6%] bg-yellow-300" />
        <div className="h-full w-[8%] bg-lime-400" />
        <div className="h-full w-[12%] bg-emerald-400" />
        <div className="h-full w-[8%] bg-teal-400" />
        <div className="h-full w-[8%] bg-cyan-400" />
        <div className="h-full w-[8%] bg-sky-400" />
        <div className="h-full w-[7%] bg-blue-400" />
        <div className="h-full w-[6%] bg-blue-300" />
        <div className="h-full w-[5%] bg-indigo-400" />
        <div className="h-full w-[5%] bg-indigo-300" />
        <div className="h-full w-[14%] bg-violet-400" />
      </div>

      {/* Arrow indicator */}
      <div
        className="absolute -bottom-1 transform -translate-x-1/2"
        style={{ left: `${posPercent}%` }}
      >
        {/* Triangle arrow pointing down */}
        <div className="relative">
          <div
            className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-red-500 mx-auto"
            style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}
          />
          {/* Label */}
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs font-black px-2 py-0.5 rounded whitespace-nowrap shadow-lg"
            style={{ minWidth: 48 }}
          >
            第{value}%
          </div>
        </div>
      </div>
    </div>
  );
}

// BMI Bar
function BMIBar({ position }: { position: number }) {
  return (
    <div className="relative h-14">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 rounded-full bg-gradient-to-r from-blue-300 via-green-400 via-yellow-400 via-orange-400 to-red-400" />
      <div
        className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-red-500 rounded-full shadow-lg z-10"
        style={{ left: `calc(${position}% - 10px)` }}
      />
    </div>
  );
}

// Report Card for download (off-screen capture target)
function ReportCard({ result, height, weight, age, gender }: { result: Result; height: number; weight: number; age: number; gender: "boy" | "girl" }) {
  return (
    <div style={{ width: 420, padding: 32, fontFamily: 'system-ui, -apple-system, sans-serif', background: '#fff', borderRadius: 24 }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(to right, #3b82f6, #4f46e5)', padding: '20px 24px', borderRadius: 16, marginBottom: 20, textAlign: 'center' }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>{result.name}</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>{result.reportDate} · AI 生長評估報告</div>
      </div>

      {/* Basic Info */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <div style={{ background: '#eff6ff', borderRadius: 12, padding: '12px 16px', textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: '#2563eb' }}>性別 / 年齡</div>
          <div style={{ fontSize: 18, fontWeight: 800 }}>{gender === "boy" ? "👦 男" : "👧 女"} · {age}歲</div>
        </div>
        <div style={{ background: '#eff6ff', borderRadius: 12, padding: '12px 16px', textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: '#2563eb' }}>身高 / 體重</div>
          <div style={{ fontSize: 18, fontWeight: 800 }}>{height}cm / {weight}kg</div>
        </div>
      </div>

      {/* Height Percentile */}
      <div style={{ border: '2px solid #bfdbfe', borderRadius: 16, padding: 16, marginBottom: 12 }}>
        <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 8 }}>📏 身高百分位</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 28, fontWeight: 900, color: '#1d4ed8' }}>第 {result.heightPercentile} 百分位</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: result.isShortStature ? '#dc2626' : '#059669' }}>{result.heightStatus}</span>
        </div>
        {/* Percentile bar */}
        <div style={{ display: 'flex', height: 20, borderRadius: 10, overflow: 'hidden' }}>
          {['#f87171','#fca5a5','#fb923c','#facc15','#fde047','#a3e635','#4ade80','#2dd4bf','#22d3ee','#38bdf8','#60a5fa','#818cf8','#a78bfa','#c084fc','#e879f9'].map((c, i) => (
            <div key={i} style={{ flex: [3,2,4,4,6,8,12,8,8,8,7,6,5,5,14][i], background: c, minWidth: 0 }} />
          ))}
        </div>
        {/* Arrow indicator */}
        <div style={{ position: 'relative', height: 30, marginTop: 2 }}>
          <div style={{ position: 'absolute', left: `${Math.min(98, Math.max(2, result.heightPercentile))}%`, transform: 'translateX(-50%)', top: 0 }}>
            <div style={{ width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderTop: '9px solid #ef4444', margin: '0 auto' }} />
            <div style={{ background: '#ef4444', color: '#fff', fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 4, whiteSpace: 'nowrap', textAlign: 'center', marginTop: 2 }}>第{result.heightPercentile}%</div>
          </div>
        </div>
      </div>

      {/* BMI */}
      <div style={{ border: '2px solid #bbf7d0', borderRadius: 16, padding: 16, marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 15, fontWeight: 800 }}>⚖️ BMI</span>
          <span style={{ fontSize: 24, fontWeight: 900, color: '#059669' }}>{result.bmi}</span>
        </div>
        <div style={{ background: result.bmiInfo.bg || '#f0fdf4', borderRadius: 8, padding: '4px 12px', display: 'inline-block', marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: result.bmiInfo.color || '#059669' }}>{result.bmiInfo.status}</span>
        </div>
      </div>

      {/* Expected Height */}
      <div style={{ border: '2px solid #fde68a', borderRadius: 16, padding: 16, marginBottom: 12 }}>
        <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 8 }}>📊 遺傳預期身高</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span>預期身高</span><span style={{ fontWeight: 800 }}>{result.expectedHeight} cm</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>差距</span>
          <span style={{ fontWeight: 800, color: result.heightGap >= 0 ? '#059669' : '#ea580c' }}>{result.heightGap >= 0 ? '+' : ''}{result.heightGap} cm</span>
        </div>
      </div>

      {/* Recommendations */}
      <div style={{ border: '2px solid #e9d5ff', borderRadius: 16, padding: 16, marginBottom: 12 }}>
        <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 8 }}>💡 每日建議</div>
        {["😴 " + result.recommendations.sleep, "🏃 " + result.recommendations.exercise, "🥛 " + result.recommendations.nutrition, "🍎 " + result.recommendations.diet].map((line, i) => (
          <div key={i} style={{ fontSize: 12, color: '#374151', lineHeight: 1.6, marginBottom: 4 }}>{line}</div>
        ))}
      </div>

      <div style={{ textAlign: 'center', fontSize: 11, color: '#9ca3af', marginTop: 12 }}>
        數據基於香港衛生署生長圖表，僅供參考
      </div>
    </div>
  );
}

export default function AssessmentPage() {
  const [step, setStep] = useState<"input" | "result">("input");
  const [gender, setGender] = useState<"boy" | "girl">("boy");
  const [name, setName] = useState("");
  const [age, setAge] = useState(8);
  const [height, setHeight] = useState(128);
  const [weight, setWeight] = useState(27);
  const [fatherHeight, setFatherHeight] = useState(170);
  const [motherHeight, setMotherHeight] = useState(158);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [showShortStatureAlert, setShowShortStatureAlert] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Mark card as ready for capture after it renders
  const handleAnalyze = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    const res = analyze(height, weight, age, gender, fatherHeight, motherHeight, name);
    setResult(res);
    setShowShortStatureAlert(res.isShortStature);
    setLoading(false);
    setStep("result");
    // Wait for DOM update, then mark card ready
    // no-op
  };

  const captureRef = useRef<HTMLDivElement>(null);

  // Helper: capture report card as canvas
  const captureCanvas = async (): Promise<HTMLCanvasElement | null> => {
    const el = captureRef.current;
    if (!el) return null;
    // Make capture element visible
    el.style.position = 'fixed';
    el.style.left = '0';
    el.style.top = '0';
    el.style.zIndex = '-1';
    el.style.display = 'block';
    await new Promise((r) => setTimeout(r, 500));
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(el, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: el.scrollWidth,
        height: el.scrollHeight,
        windowWidth: el.scrollWidth,
        windowHeight: el.scrollHeight,
      });
      return canvas;
    } catch (err) {
      console.error("html2canvas failed:", err);
      return null;
    } finally {
      el.style.display = 'none';
      el.style.left = '-9999px';
    }
  };

  const getFilename = () => {
    const n = result?.name || "report";
    const d = new Date().toISOString().slice(0, 10);
    return `growth-report-${n}-${d}.png`;
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const canvas = await captureCanvas();
      if (!canvas) { window.print(); return; }

      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) =>
        canvas.toBlob((b) => resolve(b!), "image/png")
      );
      const file = new File([blob], getFilename(), { type: "image/png" });

      // Try Web Share API first (iOS → share sheet → Save Image to Camera Roll)
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            title: `${result?.name || "小朋友"}的生長評估報告`,
            files: [file],
          });
          return; // user shared or dismissed
        } catch {
          // user cancelled share sheet — fall through to download
        }
      }

      // Fallback: traditional download (saves to Files on iOS)
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = getFilename();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    setDownloading(true);
    try {
      const canvas = await captureCanvas();
      if (!canvas) { alert("無法生成圖片"); return; }

      const blob = await new Promise<Blob>((resolve) =>
        canvas.toBlob((b) => resolve(b!), "image/png")
      );
      const file = new File([blob], getFilename(), { type: "image/png" });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            title: `${result?.name || "小朋友"}的生長評估報告`,
            files: [file],
          });
        } catch {}
      } else {
        // Fallback: copy text summary
        const text = `👤 ${result?.name || "小朋友"} 的生長評估\n📏 身高第${result?.heightPercentile}百分位 | ⚖️ BMI ${result?.bmi}\n📊 預期身高 ${result?.expectedHeight}cm\n📅 ${result?.reportDate}`;
        await navigator.clipboard.writeText(text);
        alert("報告摘要已複製！");
      }
    } finally {
      setDownloading(false);
    }
  };

  return (
    <MainLayout>
      {step === "input" ? (
        <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
                <Shield className="w-4 h-4" />
                AI 驅動 · 專業可靠
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
                AI 生長評估
              </h1>
              <p className="text-lg text-gray-600 font-medium">
                輸入孩子及父母資料，獲得專業分析報告
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-3xl shadow-2xl border-2 border-blue-100 overflow-hidden">
              {/* Gender Toggle + Name */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-6">
                <label className="block text-white/80 text-sm font-bold mb-3">孩子姓名</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="請輸入孩子姓名（選填）"
                  className="w-full px-4 py-3 rounded-xl text-gray-800 font-medium bg-white/90 placeholder:text-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <label className="block text-white/80 text-sm font-bold mb-3">孩子性別</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setGender("boy")}
                    className={`py-4 rounded-2xl font-black text-lg transition-all ${gender === "boy" ? "bg-white text-blue-600 shadow-lg scale-105" : "bg-white/20 text-white/80 hover:bg-white/30"}`}
                  >
                    👦 男仔
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("girl")}
                    className={`py-4 rounded-2xl font-black text-lg transition-all ${gender === "girl" ? "bg-white text-pink-600 shadow-lg scale-105" : "bg-white/20 text-white/80 hover:bg-white/30"}`}
                  >
                    👧 女仔
                  </button>
                </div>
              </div>

              {/* Sliders */}
              <div className="px-8 py-8 space-y-7">
                {[
                  { label: "年齡", unit: "歲", value: age, setter: setAge },
                  { label: "爸爸身高", unit: "cm", value: fatherHeight, setter: setFatherHeight },
                  { label: "媽媽身高", unit: "cm", value: motherHeight, setter: setMotherHeight },
                  { label: "孩子身高", unit: "cm", value: height, setter: setHeight },
                  { label: "孩子體重", unit: "kg", value: weight, setter: setWeight },
                ].map(({ label, unit, value, setter }) => (
                  <div key={label}>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-gray-700 font-bold">{label}</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => setter(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 text-xl font-black text-blue-600 text-center focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-sm font-medium text-gray-500 whitespace-nowrap">{unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="px-8 pb-8">
                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 via-indigo-600 to-violet-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl hover:shadow-2xl hover:scale-102 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <><Loader2 className="w-6 h-6 animate-spin" />AI 分析中，請稍候...</>
                  ) : (
                    <><Activity className="w-6 h-6" />AI 評估分析<ArrowRight className="w-6 h-6" /></>
                  )}
                </button>
                <p className="text-center text-gray-400 text-sm mt-4 font-medium">
                  數據僅供參考，不會被儲存或分享 🔒
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : result ? (
        <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-10 print:py-4">
          <div className="max-w-2xl mx-auto px-4 space-y-5">
            {/* Report Header - Name + Date + Actions */}
            <div className="bg-white rounded-3xl shadow-xl border-2 border-blue-100 overflow-hidden print:shadow-none print:border-0">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:bg-none print:border-b print:border-blue-100">
                <div>
                  <div className="text-2xl font-black text-white print:text-gray-800">{result.name}</div>
                  <div className="text-white/80 text-sm font-medium print:text-gray-500">{result.reportDate} · AI 生長評估報告</div>
                </div>
                <div className="flex gap-2 print:hidden">
                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl font-bold text-sm transition-all disabled:opacity-60"
                  >
                    {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                    下載圖片
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl font-bold text-sm transition-all"
                  >
                    <Share2 className="w-4 h-4" />分享
                  </button>
                </div>
              </div>
              <div className="px-6 py-3 bg-blue-50 print:bg-gray-50">
                <div className="flex gap-4 text-sm font-medium text-gray-600">
                  <span>{gender === "boy" ? "👦 男仔" : "👧 女仔"} · {age} 歲</span>
                  <span>·</span>
                  <span>爸爸 {fatherHeight}cm</span>
                  <span>·</span>
                  <span>媽媽 {motherHeight}cm</span>
                </div>
              </div>
            </div>

            {/* 1. 身高百分位 */}
            <div className="bg-white rounded-3xl shadow-xl border-2 border-blue-100 overflow-hidden print:shadow-none print:border-0">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 flex items-center justify-between print:bg-none">
                <h2 className="text-white font-black text-lg print:text-gray-800">📏 身高百分位</h2>
                <span className={`text-sm font-bold px-3 py-1 rounded-full print:bg-gray-100 ${result.isShortStature ? "bg-red-500 text-white" : "bg-white/30 text-white"} print:text-gray-600`}>
                  {result.isShortStature ? "⚠️ 需關注" : "✅ 正常"}
                </span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="bg-blue-50 rounded-2xl p-4 text-center print:bg-gray-50">
                    <div className="text-sm text-blue-600 font-medium mb-1">當前身高</div>
                    <div className="text-3xl font-black text-blue-700">{height}<span className="text-base font-medium">cm</span></div>
                  </div>
                  <div className="bg-indigo-50 rounded-2xl p-4 text-center print:bg-gray-50">
                    <div className="text-sm text-indigo-600 font-medium mb-1">遺傳預期身高</div>
                    <div className="text-3xl font-black text-indigo-700">{result.expectedHeight}<span className="text-base font-medium">cm</span></div>
                  </div>
                </div>

                {/* Gap */}
                <div className={`rounded-2xl p-4 mb-5 ${result.heightGap >= 0 ? "bg-emerald-50 border-2 border-emerald-200" : "bg-orange-50 border-2 border-orange-200"}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-bold">遺傳潜能差距</span>
                    <span className={`text-2xl font-black ${result.heightGap >= 0 ? "text-emerald-600" : "text-orange-600"}`}>
                      {result.heightGap >= 0 ? "+" : ""}{result.heightGap} cm
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 font-medium">
                    {result.heightGap >= 0 ? "✨ 身高高於遺傳潜能，表現出色" : "📈 身高低於遺傳潜能，仍有成長空間"}
                  </p>
                </div>

                {/* Percentile bar with arrow */}
                <div className="mb-10">
                  <div className="flex justify-between text-sm font-bold text-gray-600 mb-3">
                    <span>第 {result.heightPercentile} 百分位</span>
                    <span className={result.isShortStature ? "text-red-600" : "text-emerald-600"}>{result.heightStatus}</span>
                  </div>
                  <PercentileBar value={result.heightPercentile} />
                  <div className="flex justify-between text-xs text-gray-400 mt-6 font-medium">
                    <span>低</span><span>3%</span><span>15%</span><span>50%</span><span>85%</span><span>97%</span><span>高</span>
                  </div>
                </div>

                {result.isShortStature && (
                  <div className="mt-4 bg-red-50 border-2 border-red-200 rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">⚠️</span>
                      <div>
                        <div className="font-black text-red-700 mb-1">矮小症提醒</div>
                        <p className="text-sm text-red-600 font-medium">
                          孩子身高低於第3百分位，建議儘早諮詢兒童內分泌科或生長發育專科醫生。
                          及時就醫是改善成年身高的關鍵。
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 2. BMI 健康指標 */}
            <div className="bg-white rounded-3xl shadow-xl border-2 border-emerald-100 overflow-hidden print:shadow-none print:border-0">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 print:bg-none">
                <h2 className="text-white font-black text-lg print:text-gray-800">⚖️ BMI 健康指標</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-500 font-medium">BMI 指數</div>
                    <div className="text-5xl font-black text-emerald-700">{result.bmi}</div>
                  </div>
                  <div className={`px-4 py-2 rounded-full font-black text-sm ${result.bmiInfo.bg} ${result.bmiInfo.color}`}>
                    {result.bmiInfo.status}
                  </div>
                </div>
                <div className="mb-3">
                  <BMIBar position={result.bmiChartPos} />
                  <div className="flex justify-between text-xs text-gray-400 mt-1 font-medium">
                    <span>過輕</span><span>標準下限</span><span>標準</span><span>標準上限</span><span>過重</span>
                  </div>
                </div>
                <div className="text-xs text-gray-400 font-medium">
                  參考值（{age}歲{gender === "boy" ? "男" : "女"}）：正常 BMI 範圍 {result.bmiInfo.p3} - {result.bmiInfo.p97}
                </div>
              </div>
            </div>

            {/* 3. 預期 vs 實際 */}
            <div className="bg-white rounded-3xl shadow-xl border-2 border-amber-100 overflow-hidden print:shadow-none print:border-0">
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-4 print:bg-none">
                <h2 className="text-white font-black text-lg print:text-gray-800">📊 預期身高 vs 實際身高</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm font-bold text-gray-600 mb-1">
                      <span>遺傳預期</span><span className="text-amber-600">{result.expectedHeight} cm</span>
                    </div>
                    <div className="h-6 bg-amber-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-end pr-3">
                        <span className="text-xs font-black text-white">預期</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-bold text-gray-600 mb-1">
                      <span>實際身高</span>
                      <span className={result.heightGap < 0 ? "text-orange-600" : "text-emerald-600"}>
                        {height} cm
                        ({result.heightGap < 0 ? `落後 ${Math.abs(result.heightGap)} cm` : `超標 ${result.heightGap} cm`})
                      </span>
                    </div>
                    <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full flex items-center justify-end pr-3 ${result.heightGap >= 0 ? "bg-gradient-to-r from-emerald-400 to-teal-400" : "bg-gradient-to-r from-orange-400 to-red-400"}`}
                        style={{ width: `${Math.min(100, (height / result.expectedHeight) * 100)}%` }}
                      >
                        <span className="text-xs font-black text-white">第{result.heightPercentile}百分位</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm text-gray-500 font-medium">
                  {result.heightGap < 0
                    ? `📈 建議加強營養運動，爭取追回 ${Math.abs(result.heightGap)} cm 差距`
                    : "✨ 身高發展良好，繼續保持"}
                </div>
              </div>
            </div>

            {/* 4. 每日建議 */}
            <div className="bg-white rounded-3xl shadow-xl border-2 border-purple-100 overflow-hidden print:shadow-none print:border-0">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 print:bg-none">
                <h2 className="text-white font-black text-lg print:text-gray-800">💡 每日建議</h2>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { emoji: "😴", title: "睡眠", desc: result.recommendations.sleep, color: "bg-blue-50 border-blue-200" },
                  { emoji: "🏃", title: "運動", desc: result.recommendations.exercise, color: "bg-emerald-50 border-emerald-200" },
                  { emoji: "🥛", title: "營養", desc: result.recommendations.nutrition, color: "bg-amber-50 border-amber-200" },
                  { emoji: "🍎", title: "飲食", desc: result.recommendations.diet, color: "bg-pink-50 border-pink-200" },
                ].map(({ emoji, title, desc, color }) => (
                  <div key={title} className={`flex items-start gap-4 rounded-2xl p-4 border-2 ${color}`}>
                    <span className="text-3xl">{emoji}</span>
                    <div>
                      <div className="font-black text-gray-800 mb-1">{title}</div>
                      <p className="text-sm text-gray-600 font-medium leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Short Stature Alert Banner */}
            {showShortStatureAlert && (
              <div className="bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 rounded-3xl shadow-2xl overflow-hidden print:hidden">
                <div className="p-6 text-center text-white">
                  <div className="text-5xl mb-3">🏥</div>
                  <h3 className="text-2xl font-black mb-2">孩子可能面臨矮小症風險</h3>
                  <p className="text-white/90 font-medium mb-4 text-sm leading-relaxed">
                    身高低於第3百分位，或每年生長速度少於4厘米，建議儘早諮詢專科醫生。
                    及時就醫是改善成年身高的關鍵！
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button className="flex items-center justify-center gap-2 bg-white text-red-600 py-3 px-6 rounded-2xl font-black text-lg shadow-lg hover:shadow-xl transition-all">
                      立即諮詢
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-white/20 text-white py-3 px-6 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all">
                      了解矮小症
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 print:hidden">
              <button
                onClick={() => setStep("input")}
                className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" />重新分析
              </button>
              <button
                onClick={() => {
                  setStep("input");
                  setGender(gender === "boy" ? "girl" : "boy");
                }}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all"
              >
                兄弟姊妹分析 →
              </button>
            </div>

            <p className="text-center text-gray-400 text-sm font-medium print:text-center">
              數據基於香港衛生署生長圖表，僅供參考 👨‍⚕️
            </p>
          </div>
        </section>
      ) : null}
      {/* Hidden capture element for html2canvas */}
      {result && (
        <div
          ref={captureRef}
          style={{ position: 'fixed', left: '-9999px', top: 0, zIndex: -1, display: 'none' }}
          aria-hidden="true"
        >
          <ReportCard result={result} height={height} weight={weight} age={age} gender={gender} />
        </div>
      )}
    </MainLayout>
  );
}
