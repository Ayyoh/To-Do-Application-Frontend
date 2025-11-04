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
import { Folder, Trash2 } from "lucide-react";

import { Route as FolderRoute } from "@/routes/folders/$folderId";
import { useParams } from "@tanstack/react-router";
import { useGetTodoQuery } from "@/hooks/useQuery/useTodoQuery";
import type { Todo } from "../../api/todoApi";
import { Button } from "@/components/ui/button";
import { useDeleteTodoMutation } from "@/hooks/useMutation/useDeleteTodoMutation";
import SkeletonLoader from "@/components/skeleton-loader";

function Header() {
  const { folderId } = useParams({ from: FolderRoute.id });
  const { data: folders } = useGetFoldersQuery();
  const { data: todos, isLoading } = useGetTodoQuery(Number(folderId));
  const deleteTodoMutation = useDeleteTodoMutation();

  const folder = folders?.find((f: any) => f.id === Number(folderId));

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

                  return (
                    <div
                      key={todo.id}
                      className="bg-muted/50 rounded-xl p-4 flex flex-col gap-1"
                    >
                      <div className="flex flex-row items-center justify-between gap-2">
                        <span
                          className={`font-quicksand font-semibold truncate block text-left max-w-[120px]}`}
                        >
                          {todo.title}
                        </span>

                        <Button
                          variant="secondary"
                          onClick={() => deleteTodoMutation.mutate(todo.id)}
                          className=""
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
              )}{" "}
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Header;
