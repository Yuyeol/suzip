import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/shared/api/profile";
import { profileKeys } from "@/shared/utils/queryKeyFactory";
import { QUERY_CONFIG } from "@/shared/constants/queryConfig";

export function useGetProfile() {
  return useQuery({
    queryKey: profileKeys.detail(),
    queryFn: () => getProfile(),
    ...QUERY_CONFIG.PROFILE,
  });
}
