import axios from "axios";

// Criar uma instância do Axios com base URL padrão
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api",
});

// Interceptar requisições e adicionar o token JWT, se disponível
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
