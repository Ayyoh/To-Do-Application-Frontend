import { signInUser } from "@/features/-auth/api/api";
import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

type LoginInput = {
  email: string;
  password: string;
};

export function useSignInMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginInput) => {
      const res = await api.post("/users/login", data);

      return res.data;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["auth", "me"], user);
      router.navigate({ to: "/" });
    },
  });
}
