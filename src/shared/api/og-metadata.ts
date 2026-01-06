import {
  ogMetadataPostRequestSchema,
  ogMetadataPostResponse,
  type OgMetadata,
  type OgMetadataPostRequest,
} from "@/shared/api/schemas/og-metadata.schema";
import { fetcher } from "@/shared/utils/api/fetcher";

// POST /api/og-metadata (URL → OG 메타데이터 추출)
export async function postOgMetadata(
  request: OgMetadataPostRequest
): Promise<OgMetadata> {
  const validated = ogMetadataPostRequestSchema.parse(request);

  const url = "/api/og-metadata";
  const response = await fetcher(url, ogMetadataPostResponse, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validated),
  });

  return response.data;
}

// Re-export types
export type { OgMetadata, OgMetadataPostRequest };
