import { createTodo, type CreateTodoInput } from "@/features/-todo/api/todoApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTodoInput) => createTodo(input),
    onSuccess: (newTodo) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({
        queryKey: ["todos", newTodo.folderId ?? "all"],
      });
      toast.success("Created a Todo.");
    },
  });
}
