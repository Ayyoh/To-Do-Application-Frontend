import { logoutUser } from "@/features/-auth/api/userApi";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";

export function useLogoutMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: async () => {
      await queryClient.removeQueries({ queryKey: ["auth", "me"] });
      router.navigate({ to: "/auth/signIn" });
    },
    onError: (error) => {
      console.error("Logout Failed", error);
    },
  });
}
