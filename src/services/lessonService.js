import { apiRequest } from "./api.js";

export const getLessons = (category) =>
  apiRequest(`/lessons${category ? `?category=${encodeURIComponent(category)}` : ""}`);

export const getLesson = (id) => apiRequest(`/lessons/${id}`);

export const getCategories = () => apiRequest("/lessons/categories");

export const createLesson = (data) =>
  apiRequest("/lessons", { method: "POST", body: JSON.stringify(data) });

export const updateLesson = (id, data) =>
  apiRequest(`/lessons/${id}`, { method: "PUT", body: JSON.stringify(data) });

export const deleteLesson = (id) =>
  apiRequest(`/lessons/${id}`, { method: "DELETE" });
