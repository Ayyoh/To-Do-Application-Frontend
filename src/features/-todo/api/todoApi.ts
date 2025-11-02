import { api } from "@/lib/axios";

export type Todo = {
  id: number;
  title: string;
  description?: string | null;
  completed: boolean;
  folderId?: number | null;
  userId: number;
  createdAt?: string | null;
};

export type CreateTodoInput = {
  title: string;
  description?: string;
  folderId?: number | null;
};

export async function getAllTodo() {
  const res = await api.get("/todo/todos");

  return res.data.todos;
}

export async function getAllTodoByFolder(folderId: number) {
  const res = await api.get(`/todo/folders/${folderId}/todos`);

  return res.data.todos;
}

export async function createTodo(input: CreateTodoInput): Promise<Todo> {
  const res = await api.post("/todo/create-todo", input);

  return res.data as Todo;
}
