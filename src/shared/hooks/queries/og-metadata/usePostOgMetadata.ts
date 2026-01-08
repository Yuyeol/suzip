import { useMutation } from "@tanstack/react-query";
import { postOgMetadata } from "@/shared/api/og-metadata";
import type { OgMetadataPostRequest } from "@/shared/api/og-metadata";

export function usePostOgMetadata() {
  return useMutation({
    mutationFn: (request: OgMetadataPostRequest) => postOgMetadata(request),
  });
}
