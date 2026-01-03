import axios from "axios";

const allowedOrigins = {
  production: "https://planova-web-backend.onrender.com", 
  development: "http://localhost:5050"
};

const baseURL =
  import.meta.env.MODE === "development"
    ? allowedOrigins.development
    : allowedOrigins.production;

const newRequest = axios.create({
  baseURL,
  withCredentials: true,
});

// Automatically attach token to every request
newRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default newRequest;
