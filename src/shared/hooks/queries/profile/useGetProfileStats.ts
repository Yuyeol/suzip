import { useQuery } from "@tanstack/react-query";
import { getProfileStats } from "@/shared/api/profile";
import { profileKeys } from "@/shared/utils/queryKeyFactory";

export function useGetProfileStats() {
  return useQuery({
    queryKey: profileKeys.stats(),
    queryFn: () => getProfileStats(),
  });
}
