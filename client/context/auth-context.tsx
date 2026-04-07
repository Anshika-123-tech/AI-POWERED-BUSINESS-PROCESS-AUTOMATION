import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface AuthUser {
  customerId: string;
  name?: string;
  email?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: (customerId: string, name?: string, email?: string) => void;
  logout: () => void;
  signup: (name: string, email: string, password: string) => { customerId: string };
  validateCustomerId: (customerId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize auth from localStorage
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('auth_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (customerId: string, name?: string, email?: string) => {
    const newUser = { customerId, name, email };
    setUser(newUser);
    localStorage.setItem('auth_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    // Also clear stored tickets
    localStorage.removeItem('tickets');
  };

  const signup = (name: string, email: string, password: string) => {
    // Generate a unique customer ID
    const customerId = `CUST-2026-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    
    // Store user credentials (in a real app, this would be backend)
    const userData = { name, email, password, customerId, createdAt: new Date().toISOString() };
    localStorage.setItem(`user_${customerId}`, JSON.stringify(userData));
    
    // Log them in
    login(customerId, name, email);
    
    return { customerId };
  };

  const validateCustomerId = (customerId: string): boolean => {
    // Check if customer ID exists in localStorage (stored during signup)
    return localStorage.getItem(`user_${customerId}`) !== null;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isLoggedIn: !!user,
      login,
      logout,
      signup,
      validateCustomerId,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
