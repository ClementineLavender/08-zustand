import axios from "axios";

export const serverApi = axios.create({
  baseURL: "https://notehub-api.goit.study",
  withCredentials: true,
});