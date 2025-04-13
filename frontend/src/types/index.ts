export interface Article {
  id: number;
  title: string;
  summary: string;
  content: string;
  author: string;
  publishedAt: string;
  likeCount?: number;
}

export interface Comment {
  id: number;
  articleId: number;
  userId: number;
  username: string;
  content: string;
  createdAt: string;
}

export interface User {
  id: number;
  username: string;
  roles: string[];
}

export interface AuthResponse {
  status: string;
  message: string;
  user?: User;
  userId?: number;
  username?: string;
}

export interface ErrorResponse {
  status: string;
  message: string;
}
