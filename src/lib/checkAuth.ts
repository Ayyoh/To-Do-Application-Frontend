import { api } from "./axios";

export async function CheckAuth() {
  try {
    const res = await api.get("/users/me"); // Axios auto-parses JSON
    console.log(res.data.email)
    
    return res.data.email; // ✅ access the user directly
  } catch (error: any) {
    console.log("error in checkauth:", error.response?.data || error.message);
    return null; // Return null so TanStack Query knows auth failed
  }
}
