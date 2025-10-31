import { getAllFolders } from "@/features/-todo/api/foldersApi";
import { useQuery } from "@tanstack/react-query";

export function useGetFoldersQuery() {
  return useQuery({
    queryKey: ["folders"],
    queryFn: getAllFolders,
  });
}
