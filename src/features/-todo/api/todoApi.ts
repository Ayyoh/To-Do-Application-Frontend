import { api } from "@/lib/axios";

export type Todo = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  folderId?: number;
  userId: number;
  createdAt?: string;
};

export async function getAllTodo() {
  const res = await api.get("/todo/todos")

  return res.data.todos;
}

export async function getAllTodoByFolder(folderId: number) {
  const res = await api.get(`/todo/folders/${folderId}/todos`);

  return res.data.todos;
}
