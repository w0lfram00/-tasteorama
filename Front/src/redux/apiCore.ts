import axios from "axios";

const api = axios.create({
  baseURL: "https://tasteorama-idz6.onrender.com/api",
  withCredentials: true,
});

export const setAuthHeader = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export default api;
