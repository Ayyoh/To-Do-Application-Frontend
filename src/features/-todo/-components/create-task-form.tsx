import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { SelectFolder } from "./select-folder";
import { useCreateTodoMutation } from "@/hooks/useMutation/useCreateTodoMutation";

type CreateTaskFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function CreateTaskForm({ open, setOpen }: CreateTaskFormProps) {
  const createTodoMutation = useCreateTodoMutation();

  const [folderId, setFolderId] = useState<number | null>(null);
  const [form, setForm] = React.useState({
    title: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return toast.error("Title is required");

    try {
      (await createTodoMutation).mutateAsync({
        title: form.title.trim(),
        description: form.description.trim() || undefined,
        folderId,
      });

      setForm({
        title: "",
        description: "",
      });

      setFolderId(null);
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Error in create-task-form");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-auto w-full max-w-sm max-h-[90vh] overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle>Create Task</DrawerTitle>
          <DrawerDescription>Set your daily tasks.</DrawerDescription>
        </DrawerHeader>
        <div className="m-auto w-60 flex flex-col gap-1 font-quicksand">
          <label htmlFor="task-title" className="font-semibold">
            Title
          </label>
          <Input
            name="task-title"
            type="text"
            placeholder="Task Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <Textarea
            name="description"
            placeholder="Task description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            maxLength={200}
            required
          />

          <SelectFolder onSelectFolder={setFolderId} defaultFolderId={null} />
          <DrawerFooter>
            <Button type="submit" disabled={createTodoMutation.isPending}>
              {createTodoMutation.isPending ? "Creating..." : "Create"}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </div>
    </form>
  );
}

export default CreateTaskForm;
