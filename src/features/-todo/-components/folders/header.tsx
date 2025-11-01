import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useGetFoldersQuery } from "@/hooks/useQuery/useFoldersQuery";
import { Trash2 } from "lucide-react";

import { Route as FolderRoute } from "@/routes/folders/$folderId";
import { useParams } from "@tanstack/react-router";
import { useGetTodoQuery } from "@/hooks/useQuery/useTodoQuery";
import type { Todo } from "../../api/todoApi";

function Header() {
  const { folderId } = useParams({ from: FolderRoute.id });
  const { data: folders } = useGetFoldersQuery();
  const folder = folders?.find((f: any) => f.id === Number(folderId));

  const { data: todos } = useGetTodoQuery(Number(folderId));

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
                  {folder?.folderName ?? "Folder"}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {Array.isArray(todos) && todos.length > 0 ? (
              todos.map((todo: Todo) => (
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
                </div>
              ))
            ) : (
              <div className="text-center text-muted">No tasks yet</div>
            )}{" "}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Header;
