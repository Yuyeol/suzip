import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/shared/api/profile";
import { profileKeys } from "@/shared/utils/queryKeyFactory";

export function useGetProfile() {
  return useQuery({
    queryKey: profileKeys.detail(),
    queryFn: () => getProfile(),
  });
}
