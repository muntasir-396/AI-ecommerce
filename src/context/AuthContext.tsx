import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('zelori_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Special case for admin login for demo purposes
        if (email === 'admin@zelori.com' && password === 'admin123') {
          const adminUser: User = {
            id: 'admin-1',
            email: 'admin@zelori.com',
            name: 'Zelori Admin',
            role: 'admin'
          };
          setUser(adminUser);
          localStorage.setItem('zelori_user', JSON.stringify(adminUser));
          resolve();
        } else if (email && password) {
          const regularUser: User = {
            id: 'user-' + Math.random().toString(36).substr(2, 9),
            email: email,
            name: email.split('@')[0],
            role: 'user'
          };
          setUser(regularUser);
          localStorage.setItem('zelori_user', JSON.stringify(regularUser));
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  };

  const signup = async (name: string, email: string, password: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: 'user-' + Math.random().toString(36).substr(2, 9),
          email,
          name,
          role: 'user'
        };
        setUser(newUser);
        localStorage.setItem('zelori_user', JSON.stringify(newUser));
        resolve();
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('zelori_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin'
    }}>
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
