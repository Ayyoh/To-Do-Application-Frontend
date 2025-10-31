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

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "#",
        },
        {
          title: "Project Structure",
          url: "#",
        },
      ],
    },
    {
      title: "Building Your Application",
      url: "#",
      items: [
        {
          title: "Routing",
          url: "#",
        },
        {
          title: "Data Fetching",
          url: "#",
          isActive: true,
        },
        {
          title: "Rendering",
          url: "#",
        },
        {
          title: "Caching",
          url: "#",
        },
        {
          title: "Styling",
          url: "#",
        },
        {
          title: "Optimizing",
          url: "#",
        },
        {
          title: "Configuring",
          url: "#",
        },
        {
          title: "Testing",
          url: "#",
        },
        {
          title: "Authentication",
          url: "#",
        },
        {
          title: "Deploying",
          url: "#",
        },
        {
          title: "Upgrading",
          url: "#",
        },
        {
          title: "Examples",
          url: "#",
        },
      ],
    },
    {
      title: "API Reference",
      url: "#",
      items: [
        {
          title: "Components",
          url: "#",
        },
        {
          title: "File Conventions",
          url: "#",
        },
        {
          title: "Functions",
          url: "#",
        },
        {
          title: "next.config.js Options",
          url: "#",
        },
        {
          title: "CLI",
          url: "#",
        },
        {
          title: "Edge Runtime",
          url: "#",
        },
      ],
    },
    {
      title: "Architecture",
      url: "#",
      items: [
        {
          title: "Accessibility",
          url: "#",
        },
        {
          title: "Fast Refresh",
          url: "#",
        },
        {
          title: "Next.js Compiler",
          url: "#",
        },
        {
          title: "Supported Browsers",
          url: "#",
        },
        {
          title: "Turbopack",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const logoutMutation = useLogoutMutation();

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

          <h1 className="font-quicksand font-semibold">All Tasks</h1>
        </div>

        <SidebarGroupContent className="">
          <SidebarGroupLabel className="text-sm font-quicksand font-semibold">
            Folders
          </SidebarGroupLabel>
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
