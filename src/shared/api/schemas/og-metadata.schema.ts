import { z } from "zod";

// Request Schema
export const ogMetadataPostRequestSchema = z.object({
  url: z.string().url(),
});

// Response Schema
export const ogMetadataSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  thumbnail: z.string().nullable(),
});

export const ogMetadataPostResponse = z.object({
  data: ogMetadataSchema,
});

// Types
export type OgMetadata = z.infer<typeof ogMetadataSchema>;
export type OgMetadataPostRequest = z.infer<typeof ogMetadataPostRequestSchema>;