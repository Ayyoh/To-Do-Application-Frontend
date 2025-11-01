"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "./ui/input";
import { useCreateFolderMutation } from "@/hooks/useMutation/useCreateFolderMutation";
import toast from "react-hot-toast";
import { useAuthQuery } from "@/hooks/useQuery/useAuthQuery";

export function AppDrawer() {
  const createFolderMutation = useCreateFolderMutation();
  const { data: user } = useAuthQuery();

  const [folderName, setFolderName] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName) return toast.error("Folder name is required");

    try {
      await createFolderMutation.mutateAsync({
        folderName,
        userId: user.id,
      }),
        setFolderName("");
      setOpen(false);
    } catch (error) {
      console.log("error in app-drawer: ", error);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Create</Button>
      </DrawerTrigger>

      <DrawerContent>
        <form onSubmit={handleSubmit}>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Move Goal</DrawerTitle>
              <DrawerDescription>
                Set your daily activity goal.
              </DrawerDescription>
            </DrawerHeader>
            <div className="m-auto w-60">
              <Input
                type="text"
                placeholder="Folder Name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                required
              />
            </div>
            <DrawerFooter>
              <Button type="submit">
                {createFolderMutation.isPending ? "Creating..." : "Create"}
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
