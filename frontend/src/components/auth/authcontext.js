import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserName = localStorage.getItem('un');
    const storedUserId = localStorage.getItem('uid');
    if (storedToken && storedUserName && storedUserId) {
      setToken(storedToken);
      setUserName(storedUserName);
      setUserId(storedUserId);
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (newToken, user) => {
    // Set all states at once to ensure synchronous update
    await Promise.all([
      setToken(newToken),
      setUserName(user.username),
      setUserId(user.id),
      setIsLoggedIn(true)
    ]);

    // Update localStorage
    localStorage.setItem('token', newToken);
    localStorage.setItem('uid', user.id);
    localStorage.setItem('un', user.username);
  };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
    setUserName(null);
    setUserId(null);
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    localStorage.removeItem('un');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, userName, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;