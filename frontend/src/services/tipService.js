import { apiRequest } from "./api.js";

export const getTips = (category) =>
  apiRequest(`/tips${category ? `?category=${encodeURIComponent(category)}` : ""}`);

export const getTip = (id) => apiRequest(`/tips/${id}`);

export const createTip = (data) =>
  apiRequest("/tips", { method: "POST", body: JSON.stringify(data) });

export const updateTip = (id, data) =>
  apiRequest(`/tips/${id}`, { method: "PUT", body: JSON.stringify(data) });

export const deleteTip = (id) =>
  apiRequest(`/tips/${id}`, { method: "DELETE" });
