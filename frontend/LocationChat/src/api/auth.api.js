import axios from "axios";
import { data } from "react-router-dom";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API; // ✅ ADD THIS

export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);
