import axios from 'axios';

const API_URL = '/api/lessons';

export const lessonService = {
  getAllLessons: async (filters = {}) => {
    const response = await axios.get(API_URL, { params: filters });
    return response.data;
  },

  getLessonById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  createLesson: async (lessonData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, lessonData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  updateLesson: async (id, lessonData) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/${id}`, lessonData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  deleteLesson: async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  updateProgress: async (id, progress, completed) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      `${API_URL}/${id}/progress`,
      { progress, completed },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },

  getUserProgress: async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/user/progress`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};
