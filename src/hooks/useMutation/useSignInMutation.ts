import { signInUser, type signInUserInput } from "@/features/-auth/api/userApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import toast from "react-hot-toast";

export function useSignInMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (input: signInUserInput) => signInUser(input),
    onSuccess: (user) => {
      queryClient.setQueryData(["auth", "me"], user);
      router.navigate({ to: "/" });
    },
    onError: (error: any) => {
      const message = error.response.data.error;

      if (error) {
        toast.error(message);
      }
    },
  });
}
