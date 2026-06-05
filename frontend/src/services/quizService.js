import axios from 'axios';

const API_URL = '/api/quizzes';

export const quizService = {
  getAllQuizzes: async (filters = {}) => {
    const response = await axios.get(API_URL, { params: filters });
    return response.data;
  },

  getQuizById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  createQuiz: async (quizData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, quizData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  updateQuiz: async (id, quizData) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/${id}`, quizData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  deleteQuiz: async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  submitQuiz: async (id, answers) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/${id}/submit`, { answers }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  getUserAttempts: async (quizId) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/user/attempts`, {
      headers: { Authorization: `Bearer ${token}` },
      params: quizId ? { quizId } : {},
    });
    return response.data;
  },
};
