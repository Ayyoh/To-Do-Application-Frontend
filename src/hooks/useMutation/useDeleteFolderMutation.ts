import { deleteFolder } from "@/features/-todo/api/foldersApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteFolderMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (folderId: number) => deleteFolder(folderId),
    onSuccess: async () => {
      toast.success("Folder deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
    onError: (error: any) => {
      toast.error("Failed to remove folder");
    },
  });
}
