import { createFolder, type createFolderInput } from "@/features/-todo/api/foldersApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateFolderMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: createFolderInput) => createFolder(input),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["folders"] })
        }
    })
}