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
import { Trash2 } from "lucide-react";
import { useState } from "react";
import type { Todo } from "../api/todoApi";
import { Input } from "@/components/ui/input";
import { CreateTask } from "./create-task";
import { useParams } from "@tanstack/react-router";
import { useGetFoldersQuery } from "@/hooks/useQuery/useFoldersQuery";

type TodoPageProps = {
  folderId?: number;
};

export default function TodoPage({ folderId }: TodoPageProps) {
  const { data: todos } = useGetTodoQuery(Number(folderId));
  const { data: folders } = useGetFoldersQuery();

  const [completed, setCompleted] = useState(0);

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
          <Progress value={completed} />
          <div className="grid grid-cols-2 gap-2">
            <Input type="search" placeholder="Search tasks..."></Input>
            <div className="flex items-center hover:cursor-pointer">
              <CreateTask />
            </div>
          </div>

          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {Array.isArray(todos) && todos.length > 0 ? (
              todos.map((todo: Todo) => {
                const folder = folders?.find(
                  (f: any) => f.id === todo.folderId
                );
                const folderName = folder?.folderName ?? "No Folder";

                return (
                  <div
                    key={todo.id}
                    className="bg-muted/50 aspect-video rounded-xl p-4 flex flex-col gap-2"
                  >
                    <div className="flex flex-row items-center justify-between">
                      <span className="font-quicksand font-semibold">
                        {todo.title}
                      </span>
                      <Trash2 size={16} className="text-red-500" />
                    </div>
                    <span className="font-quicksand text-[#B6B6B7]">
                      {todo.description}
                    </span>

                    <span className="font-quicksand text-[#B6B6B7]">
                      📁 {folderName}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-muted">No tasks yet</div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
