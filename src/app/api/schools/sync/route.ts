import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

const DATA_GOV_API =
  "https://res.data.gov.hk/api/get-download-file?name=https%3A%2F%2Fapplications.edb.gov.hk%2Fdatagovhk%2Fdata%2FSchoolBasicInfo.xml&provider=hk-edb";

interface SchoolBasicInfo {
  SchoolNameEng: string;
  SchoolNameChi: string;
  SchoolNumber: string;
  SchoolLevelEng: string;
  SchoolLevelChi: string;
  SchoolSessionEng: string;
  SchoolSessionChi: string;
  StudentGenderEng: string;
  StudentGenderChi: string;
  DistrictEng: string;
  DistrictChi: string;
  FinanceTypeEng: string;
  FinanceTypeChi: string;
  TelephoneNumber: string;
  SchoolWebSite: string;
  SchoolAddressEng: string;
  SchoolAddressChi: string;
  RegistrationStatusEng: string;
  RegistrationStatusChi: string;
  SchoolRegistrationNumber: string;
}

interface ApiResponse {
  SchoolBasicInfo?: SchoolBasicInfo | SchoolBasicInfo[];
}

function mapSchoolLevel(level: string): string {
  if (level.includes("PRIMARY") || level.includes("KINDERGARTEN")) return "小學";
  if (level.includes("SECONDARY")) return "中學";
  return "其他";
}

function mapSchoolType(gender: string, financeType: string): string {
  const isCoed = gender.includes("CO-ED") || gender.includes("男女");
  const type = financeType.toLowerCase();

  if (type.includes("government") || type.includes("官立")) return isCoed ? "官立男女" : "官立";
  if (type.includes("aided") || type.includes("資助")) return isCoed ? "資助男女" : "資助";
  if (type.includes("direct") || type.includes("直資")) return isCoed ? "直資男女" : "直資";
  if (type.includes("private") || type.includes("私立")) return isCoed ? "私立男女" : "私立";
  if (type.includes("international") || type.includes("國際")) return "國際";

  return gender.includes("CO-ED") || gender.includes("男女") ? "男女" : gender.includes("GIRLS") || gender.includes("女") ? "女校" : "男校";
}

function mapDistrict(district: string): string {
  const map: Record<string, string> = {
    "CENTRAL & WESTERN": "中西區",
    "EASTERN": "東區",
    "SOUTHERN": "南區",
    "WAN CHAI": "灣仔區",
    "SHA TIN": "沙田區",
    "KWAI TSING": "葵青區",
    "TSUEN WAN": "荃灣區",
    "TUEN MUN": "屯門區",
    "YUEN LONG": "元朗區",
    "NORTH": "北區",
    "TAI PO": "大埔區",
    "SAI KUNG": "西貢區",
    "SHATIN": "沙田區",
    "KAU TUNG": "觀塘區",
    "KWUN TONG": "觀塘區",
    "WONG TAI SIN": "黃大仙區",
    "KOWLOON CITY": "九龍城區",
    "YAU TSIM MONG": "油尖旺區",
    "SHAM SHUI PO": "深水埗區",
    "ISLANDS": "離島區",
  };
  return map[district.toUpperCase()] || district;
}

function inferBand(schoolName: string, type: string): string | null {
  // Band 1 indicators (top academic schools)
  const band1Keywords = [
    "diocesan", "dbs", "dg", "st paul", "st. paul",
    "la salle", "lasalle",
    "st joseph", "st. joseph",
    "heep yunn", "heep yun",
    " Sacred Heart", "skh",
    "poole", "poon",
    "st mary", "st. mary",
    "canossa", "caritas",
    "heung to", "stvc",
    "tst", "sgf",
    "borgio", "stfrancislai",
    "ming king", "queen's",
    "columbia", "kingling",
    "st. coen", "coen",
    "yuen yuen", "yuan",
  ];

  const nameLower = schoolName.toLowerCase();
  for (const kw of band1Keywords) {
    if (nameLower.includes(kw)) return "Band 1";
  }

  return null; // Will be null for unknown - manual assignment needed
}

export async function POST() {
  try {
    const supabase = createAdminClient();

    // 1. Fetch from data.gov.hk
    const response = await fetch(DATA_GOV_API, {
      next: { revalidate: 0 }, // Always fresh
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch from data.gov.hk: ${response.status}` },
        { status: 500 }
      );
    }

    const xmlText = await response.text();

    // 2. Parse XML
    // Simple XML parser - extract SchoolBasicInfo blocks
    const schoolBlocks = xmlText.match(/<SchoolBasicInfo>[\s\S]*?<\/SchoolBasicInfo>/gi) || [];

    const schools: Array<{
      registration_number: string;
      name: string;
      name_eng: string;
      type: string;
      district: string;
      level: string;
      address: string;
      address_eng: string;
      phone: string;
      website: string | null;
      is_registered: boolean;
    }> = [];

    for (const block of schoolBlocks) {
      const getTag = (tag: string) => {
        const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"));
        return match ? match[1].trim() : "";
      };

      const regStatus = getTag("RegistrationStatusEng");
      const schoolLevel = getTag("SchoolLevelEng");

      // Skip government schools (官立) - they said "except government schools"
      const financeType = getTag("FinanceTypeEng");
      if (financeType.includes("GOVERNMENT")) continue;

      // Skip non-registered schools
      if (!regStatus.includes("REGISTRATION")) continue;

      // Skip kindergartens (we focus on primary + secondary)
      if (schoolLevel.includes("KINDERGARTEN")) continue;

      const schoolName = getTag("SchoolNameChi") || getTag("SchoolNameEng");
      if (!schoolName) continue;

      const regNum = getTag("SchoolRegistrationNumber").trim();

      schools.push({
        registration_number: regNum,
        name: schoolName,
        name_eng: getTag("SchoolNameEng").trim(),
        type: mapSchoolType(getTag("StudentGenderChi"), getTag("FinanceTypeChi")),
        district: mapDistrict(getTag("DistrictChi")) || getTag("DistrictEng"),
        level: mapSchoolLevel(schoolLevel),
        address: getTag("SchoolAddressChi"),
        address_eng: getTag("SchoolAddressEng"),
        phone: getTag("TelephoneNumber"),
        website: getTag("SchoolWebSite") || null,
        is_registered: regStatus.includes("REGISTRATION"),
      });
    }

    // 3. Get existing schools to compare
    const { data: existingSchools } = await supabase
      .from("schools")
      .select("id, registration_number, name, band");

    const existingMap = new Map(
      (existingSchools || []).map((s) => [s.registration_number, s])
    );

    // 4. Upsert: insert new, keep existing band/features if same school
    let upserted = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (const school of schools) {
      const existing = existingMap.get(school.registration_number);

      if (existing) {
        // Update existing - preserve band and features if set
        const { error } = await supabase
          .from("schools")
          .update({
            name: school.name,
            type: school.type,
            district: school.district,
            level: school.level,
            address: school.address,
            phone: school.phone,
            website: school.website,
            is_registered: school.is_registered,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id);

        if (error) errors.push(`Update error for ${school.name}: ${error.message}`);
        else upserted++;
      } else {
        // Insert new school - try to infer band, otherwise null
        const inferredBand = inferBand(school.name_eng, school.type);

        const { error } = await supabase.from("schools").insert({
          registration_number: school.registration_number,
          name: school.name,
          name_eng: school.name_eng,
          type: school.type,
          district: school.district,
          level: school.level,
          address: school.address,
          address_eng: school.address_eng,
          phone: school.phone,
          website: school.website,
          is_registered: school.is_registered,
          // band starts as null (unknown) - admin needs to assign
          // features starts as empty array
        });

        if (error) errors.push(`Insert error for ${school.name}: ${error.message}`);
        else upserted++;
      }
    }

    // 5. Find removed schools (in DB but not in API response)
    const apiRegNumbers = new Set(schools.map((s) => s.registration_number));
    const removedSchools = (existingSchools || []).filter(
      (s) => s.registration_number && !apiRegNumbers.has(s.registration_number)
    );

    // Mark removed schools as inactive (not deleting)
    for (const school of removedSchools) {
      await supabase
        .from("schools")
        .update({ is_registered: false, updated_at: new Date().toISOString() })
        .eq("id", school.id);
    }

    return NextResponse.json({
      success: true,
      message: `同步完成`,
      total: schools.length,
      upserted,
      removed: removedSchools.length,
      errors: errors.length > 0 ? errors.slice(0, 10) : undefined,
    });
  } catch (err) {
    console.error("Sync error:", err);
    return NextResponse.json(
      { error: "同步失敗，請稍後再試。" },
      { status: 500 }
    );
  }
}
