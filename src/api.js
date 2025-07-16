import axios from "axios";

const API_URL = "http://localhost:4000/api";

export const api = {
  // USERS
  registerUser: (data) => axios.post(`${API_URL}/users`, data),
  getUsers: () => axios.get(`${API_URL}/users`),
  toggleUser: (id) => axios.put(`${API_URL}/users/${id}/toggle`),
  // POSTS
  getPosts: () => axios.get(`${API_URL}/posts`),
  createPost: (data) => axios.post(`${API_URL}/posts`, data),
  editPost: (id, data) => axios.put(`${API_URL}/posts/${id}`, data),
  likePost: (id, userId) => axios.put(`${API_URL}/posts/${id}/like`, { userId }),
};