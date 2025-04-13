import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { authApi } from '../lib/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setIsLoading(true);
        const response = await authApi.getCurrentUser();
        if (response.data.status === 'success' && response.data.user) {
          setUser(response.data.user);
        }
      } catch (err) {
        // User is not logged in, that's fine
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authApi.login(username, password);
      if (response.data.status === 'success') {
        // Fetch user data after login
        const userResponse = await authApi.getCurrentUser();
        if (userResponse.data.user) {
          setUser(userResponse.data.user);
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authApi.register(username, email, password);
      if (response.data.status === 'success') {
        // After registration, we need to login
        await login(username, password);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to register');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authApi.logout();
      setUser(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to logout');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
