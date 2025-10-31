import { api } from "@/lib/axios";

export async function getAllFolders() {
    const res = await api.get("/folders")
    
    return res.data;
}