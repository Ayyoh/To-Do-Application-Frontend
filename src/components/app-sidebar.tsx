import * as React from "react";

import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import { Folder } from "lucide-react";
import { Button } from "./ui/button";
import { useLogoutMutation } from "@/hooks/useMutation/useLogoutMutation";
import { useGetFoldersQuery } from "@/hooks/useQuery/useFoldersQuery";
import { Link } from "@tanstack/react-router";

import { Route as FolderRoute } from "@/routes/folders/$folderId";

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const logoutMutation = useLogoutMutation();
  const { data: folders } = useGetFoldersQuery();

  const [active, setActive] = React.useState(false);

  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex flex-row justify-between items-center border-b p-4">
        <h1 className="font-quicksand font-semibold text-xl">Task Vault</h1>
        <ModeToggle />
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-6 p-4">
        {/* We create a SidebarGroup for each parent. */}
        <div
          onClick={() => setActive(!active)}
          className={`flex items-center gap-3 rounded-md px-4 py-2 ${
            active ? "bg-[#242427]" : "bg-none"
          }`}
        >
          <Folder size={16} />

          <Link to="/">
            <h1 className="font-quicksand font-semibold">All Tasks</h1>
          </Link>
        </div>

        <SidebarGroupContent className="">
          <SidebarGroupLabel className="text-sm font-quicksand font-semibold">
            Folders
          </SidebarGroupLabel>
          {!folders ? (
            <p className="text-xs text-gray-500">Loading folders...</p>
          ) : folders.length === 0 ? (
            <p className="text-xs text-gray-500">No folders found</p>
          ) : (
            folders.map((folder: any) => (
              <div key={folder.id} className="ml-2 py-1">
                <Link to={FolderRoute.to} params={{ folderId: folder.id }}>
                  <span>{folder.folderName}</span>
                </Link>
              </div>
            ))
          )}{" "}
        </SidebarGroupContent>

        <SidebarGroupContent className="">
          <SidebarGroupLabel className="text-sm font-quicksand font-semibold">
            Settings
          </SidebarGroupLabel>
          <SidebarGroup>
            <Button variant="ghost" onClick={() => logoutMutation.mutate()}>
              {logoutMutation.isPending ? "Logging Out" : "Logout"}
            </Button>
          </SidebarGroup>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
