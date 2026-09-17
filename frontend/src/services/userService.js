import { apiRequest } from "./api.js";

export const getUsers = async () => {
  const data = await apiRequest("/users");
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.users)) return data.users;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

export const getUser = (id) => apiRequest(`/users/${id}`);

export const getStats = () => apiRequest("/users/stats");

export const createUser = (data) =>
  apiRequest("/users", { method: "POST", body: JSON.stringify(data) });

export const updateUser = (id, data) =>
  apiRequest(`/users/${id}`, { method: "PUT", body: JSON.stringify(data) });

export const deleteUser = (id) =>
  apiRequest(`/users/${id}`, { method: "DELETE" });
