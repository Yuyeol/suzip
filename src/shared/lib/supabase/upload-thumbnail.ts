import { SupabaseClient } from "@supabase/supabase-js";
import sharp from "sharp";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const THUMBNAIL_WIDTH = 200;
const FETCH_TIMEOUT_MS = 10_000; // 10초

export function isStorageUrl(url: string): boolean {
  return url.startsWith(process.env.SUPABASE_URL ?? "");
}

export async function uploadThumbnail(
  supabase: SupabaseClient,
  thumbnailUrl: string,
  userId: string
): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const response = await fetch(thumbnailUrl, { signal: controller.signal });
    clearTimeout(timeout);
    if (!response.ok) return null;

    const arrayBuffer = await response.arrayBuffer();
    if (arrayBuffer.byteLength > MAX_FILE_SIZE) return null;

    // 200px 너비로 리사이징, webp로 변환
    const resized = await sharp(Buffer.from(arrayBuffer))
      .resize(THUMBNAIL_WIDTH)
      .webp({ quality: 80 })
      .toBuffer();

    const filePath = `${userId}/${crypto.randomUUID()}.webp`;
    const { error } = await supabase.storage
      .from("og-images")
      .upload(filePath, resized, { contentType: "image/webp", upsert: false });

    if (error) return null;

    const { data } = supabase.storage.from("og-images").getPublicUrl(filePath);
    return data.publicUrl;
  } catch {
    return null;
  }
}
