import { CheckAuth } from "@/lib/checkAuth";
import { useQuery } from "@tanstack/react-query";

export function useAuthQuery() {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: CheckAuth,
    retry: false
  })
}