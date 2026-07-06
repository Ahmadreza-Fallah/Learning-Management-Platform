import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  roleId: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userName: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  mobile: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('accessToken');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (userName: string, password: string) => {
    const response = await api.post('/auth/login', { userName, password });
    const { accessToken, refreshToken, user: userData } = response.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(userData));

    setUser(userData);
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    await api.post('/auth/register', data);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
