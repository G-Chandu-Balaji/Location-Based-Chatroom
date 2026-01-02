import axios from "axios";
import { data } from "react-router-dom";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API; // ✅ ADD THIS

export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);
