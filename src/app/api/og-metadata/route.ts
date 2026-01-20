import { NextRequest } from "next/server";
import ogs from "open-graph-scraper";
import { withErrorHandler } from "@/app/api/_utils/api-handler";
import { successResponse, errorResponse } from "@/app/api/_utils/response";
import { validateRequired, isValidUrl } from "@/app/api/_utils/validation";

// Microlink API가 필요한 동적 렌더링 사이트
const MICROLINK_WHITELIST = ["threads.com", "instagram.com", "skillsmp.com"];

// URL이 화이트리스트에 포함되는지 확인
function needsMicrolink(url: string): boolean {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    return MICROLINK_WHITELIST.some((domain) => hostname.includes(domain));
  } catch {
    return false;
  }
}

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json();
  const { url } = body;

  // 필수 필드 검증
  const validation = validateRequired(body, ["url"]);
  if (validation) return validation;

  // URL 형식 검증
  if (!isValidUrl(url)) {
    return errorResponse("Invalid URL format", 400);
  }

  // 화이트리스트에 있으면 바로 Microlink 사용
  if (needsMicrolink(url)) {
    try {
      const apiUrl = `https://api.microlink.io?url=${encodeURIComponent(url)}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Microlink API error: ${response.status}`);
      }

      const { data } = await response.json();

      const metadata = {
        title: data?.title || null,
        description: data?.description || null,
        thumbnail: data?.image?.url || data?.logo?.url || null,
      };

      return successResponse(metadata);
    } catch (error) {
      console.error("Microlink extraction failed:", error);
      return successResponse({
        title: null,
        description: null,
        thumbnail: null,
      });
    }
  }

  // 그 외 사이트는 open-graph-scraper 사용
  try {
    const { result } = await ogs({ url });

    const metadata = {
      title: result.ogTitle || result.twitterTitle || result.dcTitle || null,
      description:
        result.ogDescription ||
        result.twitterDescription ||
        result.dcDescription ||
        null,
      thumbnail:
        result.ogImage?.[0]?.url ||
        result.twitterImage?.[0]?.url ||
        result.favicon ||
        null,
    };

    return successResponse(metadata);
  } catch (error) {
    console.error("OG metadata extraction failed:", error);
    return successResponse({
      title: null,
      description: null,
      thumbnail: null,
    });
  }
});
