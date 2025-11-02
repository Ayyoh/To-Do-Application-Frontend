import { registerUser, type registerUserInput } from "@/features/-auth/api/userApi";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import toast from "react-hot-toast";

export function useRegisterMutation() {
  const queryClient = new QueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (input: registerUserInput) => registerUser(input),
    onSuccess: (data) => {
      const user = data.data;
      toast.success("Account Created Successfully!");

      if (user) {
        queryClient.setQueryData(["auth", "me"], user);
      } else {
        queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      }

      router.navigate({ to: "/" });
    },
    onError: (error: any) => {
      const message = error.response.data.error || "Registration failed";

      console.log(error);
      if (message) {
        toast.error(message);
      }
    },
  });
}
