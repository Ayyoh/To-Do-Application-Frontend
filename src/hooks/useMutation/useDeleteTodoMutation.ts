import { removeTodo } from "@/features/-todo/api/todoApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => removeTodo(id),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
