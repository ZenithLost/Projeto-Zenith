import axios from "axios";

// Acessar a variável de ambiente usando o `process.env.VUE_APP_BACKEND_URL`
const baseURL = process.env.VUE_APP_BACKEND_URL || "http://localhost:3000/api";
console.log("Base URL:", baseURL); // Para depuração

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-auth-token"] = token; // Adiciona o token ao header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
