import { api } from "@/lib/axios";

export async function signInUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  // TODO: refactor whole fetch using axios
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Invalid Credentials");
  }

  return data.user;
}

export async function logoutUser() {
  const res = await api.post("/users/logout");

  return res.data;
}