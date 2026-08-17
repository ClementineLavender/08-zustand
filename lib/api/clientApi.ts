import axios from "axios";

export const clientApi = axios.create({
  baseURL: "https://notehub-api.goit.study",
  withCredentials: true,
});