import { apiRequest } from "./api.js";

export const getUsers = () => apiRequest("/users");

export const getUser = (id) => apiRequest(`/users/${id}`);

export const getStats = () => apiRequest("/users/stats");
