import { createAdminClient } from "@/lib/supabase/server";
import type { School } from "@/types";
import MainLayout from "@/components/MainLayout";
import SchoolsPageClient from "./SchoolsPageClient";
import { SAMPLE_SCHOOLS, transformSchoolRows } from "./school-card-data";

export const revalidate = 0;

async function getInitialSchools() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("schools")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    const schools = transformSchoolRows((data as School[] | null) ?? []);
    return schools.length > 0 ? schools : SAMPLE_SCHOOLS;
  } catch {
    return SAMPLE_SCHOOLS;
  }
}

export default async function SchoolsPage() {
  const initialSchools = await getInitialSchools();

  return (
    <MainLayout>
      <SchoolsPageClient initialSchools={initialSchools} />
    </MainLayout>
  );
}
