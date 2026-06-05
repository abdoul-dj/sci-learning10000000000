import axios from 'axios';

const API_URL = '/api/users';

export const userService = {
  getAllUsers: async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  getUserById: async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  updateUserRole: async (id, role) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/${id}/role`, { role }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  deleteUser: async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};
