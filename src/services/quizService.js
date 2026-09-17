import { apiRequest } from "./api.js";

export const getQuizzes = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/quizzes${query ? `?${query}` : ""}`);
};

export const getQuiz = (id) => apiRequest(`/quizzes/${id}`);

export const getQuizAdmin = (id) => apiRequest(`/quizzes/admin/${id}`);

export const createQuiz = (data) =>
  apiRequest("/quizzes", { method: "POST", body: JSON.stringify(data) });

export const updateQuiz = (id, data) =>
  apiRequest(`/quizzes/${id}`, { method: "PUT", body: JSON.stringify(data) });

export const deleteQuiz = (id) =>
  apiRequest(`/quizzes/${id}`, { method: "DELETE" });

export const submitQuiz = (id, answers) =>
  apiRequest(`/quizzes/${id}/submit`, {
    method: "POST",
    body: JSON.stringify({ answers }),
  });

export const getMyResults = () => apiRequest("/quizzes/results/my");

export const getResult = (resultId) =>
  apiRequest(`/quizzes/results/${resultId}`);
