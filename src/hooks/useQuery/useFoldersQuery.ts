import { getAllFolders } from "@/features/-todo/api/foldersApi";
import { useQuery } from "@tanstack/react-query";

export function useFoldersQuery() {
    return useQuery({
        queryKey: ["folders"],
        queryFn: getAllFolders
    })
}