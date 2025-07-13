import { AuthContext } from './AuthContext';
import { createContext } from 'react';
import { loginUser } from '../api/authService.ts'; // or '../api/authService'
import { useEffect, useState } from 'react';

// type AuthContextType = {
//   user: any;
//   login: (email: string, password: string) => Promise<{ success: boolean; msg: any }>;
//   logout: () => void;
//   isAuthenticated: boolean | null;
// };

// export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
    const saved = await localStorage.getItem('token');
    const savedUser = await localStorage.getItem('user');
    if (saved) {
      // setToken(saved);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Error parsing user from storage", err);
      }
    }
  };
  loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    const result = await loginUser(email, password);
    if (result.success) {
      setUser(result.user);
      localStorage.setItem('token', result.user.token);
      localStorage.setItem('user', JSON.stringify(result.user));
    }
    return result;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
