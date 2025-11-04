import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useGetTodoQuery } from "@/hooks/useQuery/useTodoQuery";
import { Folder, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Todo } from "../api/todoApi";
import { Input } from "@/components/ui/input";
import { CreateTask } from "./create-task";
import { useGetFoldersQuery } from "@/hooks/useQuery/useFoldersQuery";
import { Button } from "@/components/ui/button";
import { useDeleteTodoMutation } from "@/hooks/useMutation/useDeleteTodoMutation";
import { Checkbox } from "@/components/ui/checkbox";
import SkeletonLoader from "@/components/skeleton-loader";

type TodoPageProps = {
  folderId?: number;
};

export default function TodoPage({ folderId }: TodoPageProps) {
  const { data: todos = [], isLoading } = useGetTodoQuery(Number(folderId));
  const { data: folders } = useGetFoldersQuery();
  const deleteTodoMutation = useDeleteTodoMutation();

  const [completed, setCompleted] = useState<number[]>([]);

  const handleToggle = (id: number) => {
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((todoId) => todoId !== id) : [...prev, id]
    );
  };

  const total = todos.length;
  const done = completed.length;
  const progress = total === 0 ? 0 : (done / total) * 100;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Create your tasks</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-quicksand font-bold">
                  All Tasks
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-between">
              <span className="text-sm text-muted-foreground">Progress</span>
              <span className="text-sm text-muted-foreground">
                {done} of {total} tasks completed
              </span>
            </div>

            <Progress
              value={progress}
              className="h-2 transition-all duration-300"
            />
          </div>

          {/* 🔍 Search + Create */}
          <div className="grid grid-cols-2 gap-2">
            <Input type="search" placeholder="Search tasks..." />
            <div className="flex justify-center hover:cursor-pointer">
              <CreateTask />
            </div>
          </div>

          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              {Array.isArray(todos) && todos.length > 0 ? (
                todos.map((todo: Todo) => {
                  const folder = folders?.find(
                    (f: any) => f.id === todo.folderId
                  );
                  const folderName = folder?.folderName ?? "No Folder";
                  const isDone = completed.includes(todo.id);

                  return (
                    <div
                      key={todo.id}
                      className="bg-muted/50 rounded-xl p-4 flex flex-col gap-1"
                    >
                      <div className="flex flex-row items-center justify-between gap-2">
                        <span
                          className={`font-quicksand font-semibold truncate block text-left max-w-[120px] ${
                            isDone
                              ? "line-through text-gray-400"
                              : "text-foreground"
                          }`}
                        >
                          {todo.title}
                        </span>

                        <Checkbox
                          checked={completed.includes(todo.id)}
                          onCheckedChange={() => handleToggle(todo.id)}
                        />

                        <Button
                          variant="secondary"
                          onClick={() => deleteTodoMutation.mutate(todo.id)}
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </Button>
                      </div>

                      <span className="font-quicksand text-[#B6B6B7] wrap-break-word whitespace-normal max-w-[210px]">
                        {todo.description}
                      </span>

                      <div className="font-quicksand text-[#F59F0F] flex">
                        <span className="bg-[#322A1D] border border-[#6B4C17] flex items-center gap-1 rounded-lg px-2 py-0.5 text-sm">
                          <Folder size={12} />
                          {folderName}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-muted">No tasks yet</div>
              )}
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
