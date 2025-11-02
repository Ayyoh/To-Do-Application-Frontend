"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./ui/dialog";
import CreateFolderForm from "./create-folder-form";
import { Plus } from "lucide-react";

export function AppDrawer() {
  const [open, setOpen] = React.useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <Plus size={12} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <CreateFolderForm open={open} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost">
          <Plus size={12} />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <CreateFolderForm open={open} setOpen={setOpen} />
      </DrawerContent>
    </Drawer>
  );
}
