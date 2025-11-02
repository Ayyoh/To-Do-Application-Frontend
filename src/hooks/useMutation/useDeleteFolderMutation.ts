import { deleteFolder } from "@/features/-todo/api/foldersApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import toast from "react-hot-toast";

export function useDeleteFolderMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (folderId: number) => deleteFolder(folderId),
    onSuccess: async () => {
      toast.success("Folder deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      router.navigate({ to: "/" })
    },
    onError: (error: any) => {
      toast.error("Failed to remove folder");
    },
  });
}
