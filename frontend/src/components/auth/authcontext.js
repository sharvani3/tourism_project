//authcontex.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserName = localStorage.getItem('un');
    const storedUserId = localStorage.getItem('uid');
    const storedEmail = localStorage.getItem('email');
    if (storedToken && storedUserName && storedUserId) {
      setToken(storedToken);
      setUserName(storedUserName);
      setUserId(storedUserId);
      setUserEmail(storedEmail); // Set user email in state
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (newToken, user) => {
    // Set all states at once to ensure synchronous update
    await Promise.all([
      setToken(newToken),
      setUserName(user.username),
      setUserId(user.id),
      setUserEmail(user.email),
      setIsLoggedIn(true)
    ]);
    console.log("User email set to:", user.email); // Add this line

    // Update localStorage
    localStorage.setItem('token', newToken);
    localStorage.setItem('uid', user.id);
    localStorage.setItem('un', user.username);
    localStorage.setItem('email', user.email);
    
  };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
    setUserName(''); // Clear username
    setUserId(''); // Clear userId
    setUserEmail(null); // Clear userEmail
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    localStorage.removeItem('un');
    localStorage.removeItem('email'); // Also remove email from localStorage
};


  return (
    <AuthContext.Provider value={{ isLoggedIn, token, userName, userId, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;