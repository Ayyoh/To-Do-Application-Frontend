import { signInUser, type signInUserInput } from "@/features/-auth/api/api";
import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export function useSignInMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (input: signInUserInput) => signInUser(input),
    onSuccess: (user) => {
      queryClient.setQueryData(["auth", "me"], user);
      router.navigate({ to: "/" });
    },
  });
}
