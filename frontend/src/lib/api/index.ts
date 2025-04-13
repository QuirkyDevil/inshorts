import axios from 'axios';
import { Article, Comment, AuthResponse } from '../../types';

const API_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Articles API
export const articlesApi = {
  getAll: () => apiClient.get<Article[]>('/articles'),
  getNewest: () => apiClient.get<Article[]>('/articles/newest'),
  getTrending: () => apiClient.get<Article[]>('/articles/trending'),
  getById: (id: number) => apiClient.get<Article>(`/articles/${id}`),
  create: (article: Omit<Article, 'id'>) => apiClient.post<Article>('/articles', article),
  update: (id: number, article: Partial<Article>) => apiClient.put<Article>(`/articles/${id}`, article),
  delete: (id: number) => apiClient.delete(`/articles/${id}`),
  toggleLike: (id: number) => apiClient.post(`/articles/${id}/like`),
  isLiked: (id: number) => apiClient.get(`/articles/${id}/isLiked`),
};

// Comments API
export const commentsApi = {
  getByArticleId: (articleId: number) => apiClient.get<Comment[]>(`/comments/article/${articleId}`),
  add: (articleId: number, content: string) =>
    apiClient.post<Comment>(`/comments/article/${articleId}`, { content }),
  delete: (commentId: number) => apiClient.delete(`/comments/${commentId}`),
};

// Auth API
export const authApi = {
  register: (username: string, email: string, password: string) =>
    apiClient.post<AuthResponse>('/auth/register', { username, email, password }),

  login: (username: string, password: string) => {
    // Create form data for Spring Security form login
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    return apiClient.post<AuthResponse>('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  },

  logout: () => apiClient.post<AuthResponse>('/auth/logout'),
  getCurrentUser: () => apiClient.get<AuthResponse>('/auth/user'),
};

// Interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors here (e.g., redirect to login if 401)
    return Promise.reject(error);
  }
);

export default apiClient;
