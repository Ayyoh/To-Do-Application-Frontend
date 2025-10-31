import { logoutUser } from "@/features/-auth/api/userApi";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export function useLogoutMutation() {
  const navigate = useNavigate();
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: async () => {
      await queryClient.removeQueries({ queryKey: ["auth", "me"] });
      navigate({ to: "/auth/signIn" });
    },
    onError: (error) => {
      console.error("Logout Failed", error);
    },
  });
}
