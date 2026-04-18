import type { School } from "@/types";

export interface SchoolCardData {
  id: string;
  name: string;
  name_en: string;
  district: string;
  banding: string;
  type: string;
  gender: string;
  image: string;
  tags: string[];
  highlights: string[];
}

type RawSchoolRow = Partial<School> & {
  id: string;
  name?: string | null;
  name_en?: string | null;
  district?: string | null;
  band?: string | null;
  type?: string | null;
  gender?: string | null;
  features?: string[] | null;
  image?: string | null;
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop";

export const SAMPLE_SCHOOLS: SchoolCardData[] = [
  {
    id: "1",
    name: "拔萃女書院",
    name_en: "Diocesan Girls' School",
    district: "油尖旺",
    banding: "Banding 1",
    type: "直資",
    gender: "女校",
    image: DEFAULT_IMAGE,
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
    image: DEFAULT_IMAGE,
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
    image: DEFAULT_IMAGE,
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
    image: DEFAULT_IMAGE,
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
    image: DEFAULT_IMAGE,
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
    image: DEFAULT_IMAGE,
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
    image: DEFAULT_IMAGE,
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
    image: DEFAULT_IMAGE,
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
    image: DEFAULT_IMAGE,
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
    image: DEFAULT_IMAGE,
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
    image: DEFAULT_IMAGE,
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
    image: DEFAULT_IMAGE,
    tags: ["英文中學", "官立", "Band 2"],
    highlights: ["校風良好", "師資穩定", "活動多元"],
  },
];

export const SCHOOL_TYPES = ["全部", "官立", "資助", "直資", "私立", "國際"];
export const DISTRICTS = [
  "全部",
  "中西區",
  "灣仔",
  "東區",
  "南區",
  "九龍城",
  "深水埗",
  "油尖旺",
  "觀塘",
  "其他",
];
export const BANDINGS = ["全部", "Banding 1", "Banding 2", "Banding 3"];
export const GENDERS = ["全部", "男校", "女校", "男女校"];

function normalizeFeatures(features: RawSchoolRow["features"]) {
  if (!Array.isArray(features)) {
    return [];
  }

  return features.filter(
    (feature): feature is string =>
      typeof feature === "string" && feature.trim().length > 0
  );
}

function normalizeBanding(band: RawSchoolRow["band"]) {
  if (!band) {
    return "Banding 2";
  }

  const normalized = band
    .replace(/^Banding\s*/i, "")
    .replace(/^Band\s*/i, "")
    .trim();

  return normalized ? `Banding ${normalized}` : "Banding 2";
}

export function transformSchoolRows(rows: RawSchoolRow[] | null | undefined) {
  if (!Array.isArray(rows)) {
    return [];
  }

  return rows.map((school) => {
    const features = normalizeFeatures(school.features);

    return {
      id: school.id,
      name: school.name || school.name_en || "未知學校",
      name_en: school.name_en || "",
      district: school.district || "未分類",
      banding: normalizeBanding(school.band),
      type: school.type || "資助",
      gender: school.gender || "男女校",
      image: school.image || DEFAULT_IMAGE,
      tags: features.slice(0, 3).length > 0 ? features.slice(0, 3) : ["優質教育"],
      highlights:
        features.slice(0, 3).length > 0 ? features.slice(0, 3) : ["辦學優良"],
    };
  });
}
