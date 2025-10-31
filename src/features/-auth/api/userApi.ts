import { api } from "@/lib/axios";

export type signInUserInput = {
  email: string;
  password: string;
};

export type registerUserInput = {
  username: string;
  email: string;
  password: string;
};

export async function signInUser(input: signInUserInput) {
  // TODO: refactor whole fetch using axios

  const res = await api.post("/users/login", input, { withCredentials: true });

  return res.data;
}

export async function registerUser(input: registerUserInput) {
  const res = await api.post("/users/register", input);

  return res.data;
}

export async function logoutUser() {
  const res = await api.post("/users/logout");

  return res.data;
}
