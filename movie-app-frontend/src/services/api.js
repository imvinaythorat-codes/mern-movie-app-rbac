import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
};

export const movieAPI = {
  getAll: () => api.get("/movies"),
  getById: (id) => api.get(`/movies/${id}`),
  create: (movieData) => api.post("/movies", movieData),
  update: (id, movieData) => api.put(`/movies/${id}`, movieData),
  delete: (id) => api.delete(`/movies/${id}`),
  search: (query) => api.get(`/movies/search?q=${query}`),
  sort: (field, order = "asc") => api.get(`/movies/sorted?by=${field}&order=${order}`),
};

export default api;
