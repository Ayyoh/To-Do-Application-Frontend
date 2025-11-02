import { useCreateFolderMutation } from "@/hooks/useMutation/useCreateFolderMutation";
import { useAuthQuery } from "@/hooks/useQuery/useAuthQuery";
import React from "react";
import toast from "react-hot-toast";
import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type CreateFolderFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function CreateFolderForm({ open, setOpen }: CreateFolderFormProps) {
  const createFolderMutation = useCreateFolderMutation();
  const { data: user } = useAuthQuery();

  const [folderName, setFolderName] = React.useState("");

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
    <form onSubmit={handleSubmit}>
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
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
  );
}

export default CreateFolderForm;
