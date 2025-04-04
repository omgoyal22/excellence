
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // This is a mock implementation. In a real app, this would make an API call
      setIsLoading(true);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockUser = {
        id: '1',
        username: email.split('@')[0],
        email
      };
      
      // Store user and token in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', 'mock-jwt-token');
      
      setUser(mockUser);
      toast.success('Logged in successfully');
    } catch (error) {
      toast.error('Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration and login
      const mockUser = {
        id: '1',
        username,
        email
      };
      
      // Store user and token in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', 'mock-jwt-token');
      
      setUser(mockUser);
      toast.success('Registered successfully');
    } catch (error) {
      toast.error('Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
