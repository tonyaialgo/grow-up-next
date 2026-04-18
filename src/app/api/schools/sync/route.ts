import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

const DATA_GOV_API =
  "https://res.data.gov.hk/api/get-download-file?name=https%3A%2F%2Fapplications.edb.gov.hk%2Fdatagovhk%2Fdata%2FSchoolBasicInfo.xml&provider=hk-edb";

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

  return gender.includes("CO-ED") || gender.includes("男女") ? "男女" :
         gender.includes("GIRLS") || gender.includes("女") ? "女校" : "男校";
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

function getTag(block: string, tag: string): string {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? match[1].trim() : "";
}

// GET: Return sync history
export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data: logs } = await supabase
      .from("sync_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    return NextResponse.json({ logs: logs || [] });
  } catch (err) {
    console.error("Error fetching sync logs:", err);
    return NextResponse.json({ logs: [] });
  }
}

// POST: Run school data sync
export async function POST() {
  const startTime = Date.now();
  let logId: number | null = null;

  try {
    const supabase = createAdminClient();

    // Record sync start
    const { data: logRecord } = await supabase
      .from("sync_logs")
      .insert({
        sync_type: "schools",
        status: "success", // placeholder, will update
        started_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    logId = logRecord?.id ?? null;

    // 1. Fetch XML from data.gov.hk
    const response = await fetch(DATA_GOV_API, {
      next: { revalidate: 0 },
      signal: AbortSignal.timeout(120_000), // 2 min timeout
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from data.gov.hk: ${response.status}`);
    }

    const xmlText = await response.text();

    // 2. Parse XML
    const schoolBlocks = xmlText.match(/<SchoolBasicInfo>[\s\S]*?<\/SchoolBasicInfo>/gi) || [];

    const schoolsToUpsert: Array<{
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
      const regStatus = getTag(block, "RegistrationStatusEng");
      const schoolLevel = getTag(block, "SchoolLevelEng");
      const financeType = getTag(block, "FinanceTypeEng");

      if (financeType.includes("GOVERNMENT")) continue;
      if (!regStatus.includes("REGISTRATION")) continue;
      if (schoolLevel.includes("KINDERGARTEN")) continue;

      const schoolName = getTag(block, "SchoolNameChi") || getTag(block, "SchoolNameEng");
      if (!schoolName) continue;

      const regNum = getTag(block, "SchoolRegistrationNumber").trim();
      if (!regNum) continue;

      schoolsToUpsert.push({
        registration_number: regNum,
        name: schoolName,
        name_eng: getTag(block, "SchoolNameEng").trim(),
        type: mapSchoolType(getTag(block, "StudentGenderChi"), getTag(block, "FinanceTypeChi")),
        district: mapDistrict(getTag(block, "DistrictChi")) || getTag(block, "DistrictEng"),
        level: mapSchoolLevel(schoolLevel),
        address: getTag(block, "SchoolAddressChi"),
        address_eng: getTag(block, "SchoolAddressEng"),
        phone: getTag(block, "TelephoneNumber"),
        website: getTag(block, "SchoolWebSite") || null,
        is_registered: regStatus.includes("REGISTRATION"),
      });
    }

    // 3. Get existing schools
    const { data: existingSchools } = await supabase
      .from("schools")
      .select("id, registration_number, band");

    const existingMap = new Map(
      (existingSchools || []).map((s) => [s.registration_number, s])
    );

    // 4. Build upsert payload - preserve existing band/features
    const now = new Date().toISOString();
    const upsertPayload = schoolsToUpsert.map((school) => {
      const existing = existingMap.get(school.registration_number);
      return {
        ...school,
        band: existing?.band || null,
        features: existing?.features || [],
        updated_at: now,
      };
    });

    // 5. Batch upsert
    const { error: upsertError } = await supabase
      .from("schools")
      .upsert(upsertPayload, {
        onConflict: "registration_number",
      });

    if (upsertError) {
      throw new Error(`Upsert failed: ${upsertError.message}`);
    }

    // 6. Mark removed schools as inactive
    const apiRegNumbers = new Set(schoolsToUpsert.map((s) => s.registration_number));
    const removedSchools = (existingSchools || []).filter(
      (s) => s.registration_number && !apiRegNumbers.has(s.registration_number)
    );

    if (removedSchools.length > 0) {
      await supabase
        .from("schools")
        .update({ is_registered: false, updated_at: now })
        .in("id", removedSchools.map((s) => s.id));
    }

    const elapsed = (Date.now() - startTime) / 1000;

    // Update log as success
    if (logId) {
      await supabase
        .from("sync_logs")
        .update({
          status: "success",
          total_records: schoolsToUpsert.length,
          removed_records: removedSchools.length,
          completed_at: now,
          elapsed_seconds: elapsed,
        })
        .eq("id", logId);
    }

    return NextResponse.json({
      success: true,
      message: `同步完成`,
      total: schoolsToUpsert.length,
      removed: removedSchools.length,
      elapsed_seconds: parseFloat(elapsed.toFixed(1)),
    });
  } catch (err) {
    console.error("Sync error:", err);
    const message = err instanceof Error ? err.message : "同步失敗，請稍後再試。";
    const now = new Date().toISOString();
    const elapsed = (Date.now() - startTime) / 1000;

    // Update log as failed
    if (logId) {
      await supabase
        .from("sync_logs")
        .update({
          status: "failed",
          error_message: message,
          completed_at: now,
          elapsed_seconds: elapsed,
        })
        .eq("id", logId);
    }

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
