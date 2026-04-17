"use client";

import { useParams } from "next/navigation";
import MainLayout from "@/components/MainLayout";
import { GraduationCap, MapPin, Star, Phone, Globe, ArrowLeft, Award } from "lucide-react";
import Link from "next/link";

const SCHOOLS_DB: Record<string, {
  name: string; name_en: string; district: string; banding: string;
  type: string; gender: string; established: string; religion: string;
  address: string; phone: string; website: string;
  description: string;
  highlights: string[]; achievements: string[]; curriculum: string[];
  tags: string[];
  image: string;
}> = {
  "1": {
    name: "拔萃女書院", name_en: "Diocesan Girls' School",
    district: "油尖旺", banding: "Banding 1", type: "直資", gender: "女校",
    established: "1860年", religion: "基督教", address: "九龍旺角洗衣街1號",
    phone: "2392 2401", website: "https://www.dgs.edu.hk",
    description: "拔萃女書院是香港歷史最悠久的女子中學之一，致力於培養學生成為領袖人才。學校學術成績卓越，DSE考試成績多年蟬聯全港前列。",
    highlights: ["DSE 成績全港前列", "課外活動多元", "師資優良", "設施完善"],
    achievements: ["DSE 7分或以上比率超90%", "多名學生入讀牛津、劍橋", "體藝表現出眾"],
    curriculum: ["文理兼備", "提供IB課程", "豐富選修科"],
    tags: ["Band 1", "直資", "女校", "英文中小學"],
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=400&fit=crop",
  },
  "2": {
    name: "聖保羅書院", name_en: "St. Paul's College",
    district: "中西區", banding: "Banding 1", type: "直資", gender: "男校",
    established: "1851年", religion: "基督教", address: "中環麥當勞道1號",
    phone: "2522 5135", website: "https://www.spcollege.edu.hk",
    description: "聖保羅書院是香港著名的男子中學，採用英語教學，校風淳樸，學術成績優異。",
    highlights: ["歷史悠久", "學術水平高", "升學率高", "校風純樸"],
    achievements: ["DSE 成績卓越", "多名學生入讀本地頂尖大學", "體育表現出色"],
    curriculum: ["文理兼備", "提供多元選修科", "着重全人教育"],
    tags: ["Band 1", "直資", "男校", "英文中學"],
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=400&fit=crop",
  },
};

export default function SchoolDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const school = SCHOOLS_DB[slug];

  if (!school) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
          <div className="text-center">
            <div className="text-6xl mb-4">🏫</div>
            <h2 className="text-2xl font-black text-gray-800 mb-2">學校不存在</h2>
            <p className="text-gray-500 mb-6">可能已被移除或連結無效</p>
            <Link href="/schools" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-500 transition-colors">
              <ArrowLeft className="w-5 h-5" /> 返回學校列表
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-violet-600">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl" />
          <div className="absolute top-40 -left-32 w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link href="/schools" className="inline-flex items-center gap-2 text-white/70 hover:text-white font-medium mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" /> 返回學校列表
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-xl flex-shrink-0">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">{school.banding}</span>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold">{school.type}</span>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold">{school.gender}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-2">{school.name}</h1>
              <p className="text-xl text-white/70 font-medium mb-4">{school.name_en}</p>
              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm font-medium">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{school.address}</span>
                <span className="flex items-center gap-1"><Phone className="w-4 h-4" />{school.phone}</span>
                <span className="flex items-center gap-1"><Globe className="w-4 h-4" />{school.website}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-12">
          <svg className="absolute bottom-0 w-full h-12 text-white" viewBox="0 0 1440 64" fill="none" preserveAspectRatio="none">
            <path d="M0 64L60 58.7C120 53 240 43 360 37.3C480 32 600 32 720 42.7C840 53 960 75 1080 74.7C1200 75 1320 53 1380 32.7L1440 32V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V64Z" fill="currentColor"/>
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-gradient-to-b from-white to-blue-50/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* About */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-blue-500" /> 學校簡介
            </h2>
            <p className="text-gray-700 leading-relaxed font-medium text-lg">{school.description}</p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-xl font-black text-gray-900 mb-4">學校特色</h3>
              <ul className="space-y-3">
                {school.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 text-gray-700 font-medium">
                    <span className="w-2 h-2 bg-blue-500 rounded-full" />{h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-xl font-black text-gray-900 mb-4">教學特色</h3>
              <ul className="space-y-3">
                {school.curriculum.map((c) => (
                  <li key={c} className="flex items-center gap-3 text-gray-700 font-medium">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full" />{c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 shadow-xl text-white">
            <h3 className="text-xl font-black mb-4">傑出成就</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {school.achievements.map((a, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                  <div className="text-2xl mb-2">🏆</div>
                  <p className="font-bold text-white/90">{a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-4">
            <Link href="/schools" className="flex-1 bg-gray-100 text-gray-700 text-center py-4 rounded-2xl font-bold hover:bg-gray-200 transition-colors">
              返回列表
            </Link>
            <Link href="/assessment" className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-4 rounded-2xl font-bold hover:shadow-lg transition-all">
              試用 AI 評估 →
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
