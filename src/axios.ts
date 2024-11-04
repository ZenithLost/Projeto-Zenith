import axios from "axios";

// Criar uma instância do Axios com base URL padrão
const instance = axios.create({
  baseURL: "http://localhost:3000/api", // URL base do seu backend
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
