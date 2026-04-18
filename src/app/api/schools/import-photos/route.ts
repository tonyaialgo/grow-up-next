import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY || "AIzaSyAziigHWfofsXjI9REnPze2ImHmBsQZd64";
const BATCH_SIZE = 10; // Google Places free tier: 10 req/sec
const DELAY_MS = 150; // 1000ms / 10 req = 100ms between batches

interface School {
  id: string;
  name: string;
  district: string;
  address: string | null;
  image: string | null;
}

interface ImportProgress {
  total: number;
  processed: number;
  updated: number;
  skipped: number;
  failed: number;
  errors: string[];
}

// Search Google Places for school photo
async function searchSchoolPhoto(school: School): Promise<string | null> {
  const query = `${school.name} ${school.district} school`.substring(0, 200);
  
  try {
    const url = new URL("https://maps.googleapis.com/maps/api/place/textsearch/json");
    url.searchParams.set("query", query);
    url.searchParams.set("key", GOOGLE_API_KEY);
    url.searchParams.set("type", "school");

    const res = await fetch(url.toString(), {
      headers: { "Accept": "application/json" },
    });

    if (!res.ok) {
      console.error(`Google Places API error: ${res.status}`);
      return null;
    }

    const data = await res.json();

    if (data.results && data.results.length > 0) {
      const place = data.results[0];
      
      // Check if place has photos
      if (place.photos && place.photos.length > 0) {
        const photoRef = place.photos[0].photo_reference;
        
        // Get the actual photo URL using Places Photo API
        const photoUrl = new URL("https://maps.googleapis.com/maps/api/place/photo");
        photoUrl.searchParams.set("maxwidth", "800");
        photoUrl.searchParams.set("photo_reference", photoRef);
        photoUrl.searchParams.set("key", GOOGLE_API_KEY);

        return photoUrl.toString();
      }
    }

    return null;
  } catch (err) {
    console.error(`Error searching for ${school.name}:`, err);
    return null;
  }
}

// Upload image from URL to Supabase Storage
async function uploadToStorage(supabase: ReturnType<typeof createAdminClient>, schoolId: string, imageUrl: string): Promise<string | null> {
  try {
    // Download image
    const res = await fetch(imageUrl);
    if (!res.ok) {
      console.error(`Failed to download image: ${res.status}`);
      return null;
    }

    const buffer = await res.arrayBuffer();
    const contentType = res.headers.get("content-type") || "image/jpeg";
    const filePath = `${schoolId}.jpg`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("school-photos")
      .upload(filePath, buffer, {
        contentType,
        upsert: true, // Replace existing
      });

    if (uploadError) {
      console.error(`Upload error:`, uploadError);
      return null;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("school-photos")
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (err) {
    console.error(`Upload error for ${schoolId}:`, err);
    return null;
  }
}

// Batch delay helper
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// POST: Trigger photo import for all schools without photos
export async function POST(req: NextRequest) {
  const supabase = createAdminClient();
  const progress: ImportProgress = {
    total: 0,
    processed: 0,
    updated: 0,
    skipped: 0,
    failed: 0,
    errors: [],
  };

  try {
    // 1. Fetch all schools without photos (or all if force=true)
    const { searchParams } = new URL(req.url);
    const force = searchParams.get("force") === "true";

    let query = supabase.from("schools").select("id, name, district, address, image");

    if (!force) {
      query = query.is("image", null);
    }

    const { data: schools, error: fetchError } = await query;

    if (fetchError) {
      throw new Error(`Failed to fetch schools: ${fetchError.message}`);
    }

    if (!schools || schools.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No schools need photo import",
        progress,
      });
    }

    progress.total = schools.length;
    console.log(`Starting photo import for ${schools.length} schools...`);

    // 2. Process in batches
    for (let i = 0; i < schools.length; i += BATCH_SIZE) {
      const batch = schools.slice(i, i + BATCH_SIZE);
      
      await Promise.all(
        batch.map(async (school: School) => {
          try {
            progress.processed++;

            // Skip if already has image (unless force)
            if (school.image && !force) {
              progress.skipped++;
              return;
            }

            // Search Google Places for photo
            const photoUrl = await searchSchoolPhoto(school);

            if (!photoUrl) {
              progress.failed++;
              progress.errors.push(`${school.name}: No photo found on Google`);
              return;
            }

            // Upload to Supabase Storage
            const publicUrl = await uploadToStorage(supabase, school.id, photoUrl);

            if (!publicUrl) {
              progress.failed++;
              progress.errors.push(`${school.name}: Failed to upload photo`);
              return;
            }

            // Update school record
            const { error: updateError } = await supabase
              .from("schools")
              .update({ image: publicUrl, updated_at: new Date().toISOString() })
              .eq("id", school.id);

            if (updateError) {
              progress.failed++;
              progress.errors.push(`${school.name}: DB update failed`);
              return;
            }

            progress.updated++;
            console.log(`[${progress.processed}/${progress.total}] ✓ ${school.name}`);
          } catch (err) {
            progress.failed++;
            console.error(`Error processing ${school.name}:`, err);
          }
        })
      );

      // Rate limit delay between batches
      if (i + BATCH_SIZE < schools.length) {
        await delay(DELAY_MS);
      }

      // Log progress periodically
      if ((i + BATCH_SIZE) % 100 === 0 || i + BATCH_SIZE >= schools.length) {
        console.log(`Progress: ${progress.processed}/${progress.total} | Updated: ${progress.updated} | Failed: ${progress.failed}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Import complete`,
      progress,
    });

  } catch (err) {
    console.error("Import error:", err);
    return NextResponse.json({
      success: false,
      message: "Import failed",
      error: err instanceof Error ? err.message : "Unknown error",
      progress,
    }, { status: 500 });
  }
}

// GET: Check import status
export async function GET() {
  const supabase = createAdminClient();

  try {
    // Count schools with/without photos
    const { count: withPhotos } = await supabase
      .from("schools")
      .select("*", { count: "exact", head: true })
      .not("image", "is", null);

    const { count: withoutPhotos } = await supabase
      .from("schools")
      .select("*", { count: "exact", head: true })
      .is("image", null);

    const { count: total } = await supabase
      .from("schools")
      .select("*", { count: "exact", head: true });

    return NextResponse.json({
      total: total || 0,
      withPhotos: withPhotos || 0,
      withoutPhotos: withoutPhotos || 0,
      ready: true,
    });
  } catch (err) {
    console.error("Status check error:", err);
    return NextResponse.json({ ready: false, error: "Failed to check status" }, { status: 500 });
  }
}
