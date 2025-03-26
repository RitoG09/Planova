import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://localhost:5050/api/v1",
  withCredentials: true,
});

//✅ Automatically attach token to every request
newRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default newRequest;
