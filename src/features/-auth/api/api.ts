import { api } from "@/lib/axios";

export async function signInUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  // TODO: refactor whole fetch using axios

  const res = await api.post(
    "/users/login",
    {
      email,
      password,
    },
    { withCredentials: true }
  );

  return res.data;
}

export async function logoutUser() {
  const res = await api.post("/users/logout");

  return res.data;
}
