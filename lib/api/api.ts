import axios from "axios";
import type {
  LoginData,
  RegisterData,
  UpdateUserData,
  User,
} from "@/types/user";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export async function registerUser(data: RegisterData) {
  const response = await api.post("/auth/register", data);
  return response.data;
}

export async function loginUser(data: LoginData) {
  const response = await api.post("/auth/login", data);
  return response.data;
}

export async function logoutUser() {
  const response = await api.post("/auth/logout");
  return response.data;
}

export async function getCurrentUser(): Promise<User> {
  const response = await api.get("/users/me");
  return response.data;
}

export async function updateUser(data: UpdateUserData): Promise<User> {
  const response = await api.patch("/users/me", data);
  return response.data;
}