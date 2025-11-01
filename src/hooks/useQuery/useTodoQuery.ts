import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function useGetTodoQuery(folderId: number) {
  return useQuery({
    queryKey: ["todos", folderId],
    queryFn: async () => {
      const endpoint = folderId
        ? `/todo/folders/${folderId}/todos`
        : `/todo/todos`;
      const res = await api.get(endpoint);

      return res.data.todos ?? res.data;
    },
  });
}
