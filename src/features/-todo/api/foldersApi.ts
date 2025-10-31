import { api } from "@/lib/axios";

export type createFolderInput = {
  folderName: string;
  userId: number;
};

export async function getAllFolders() {
  const res = await api.get("/folders");

  return res.data.folders;
}

export async function createFolder(input: createFolderInput) {
  const res = await api.post("/folders/create-folder", input);

  return res.data;
}
