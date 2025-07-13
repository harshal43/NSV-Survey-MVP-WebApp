import { useState } from 'react';
import { AuthContext } from './AuthContext';
import { loginUser } from '../api/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const result = await loginUser(username, password);
    if (result.success) {
      setUser(result.user);
      localStorage.setItem('token', result.user.token);
    }
    return result;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
