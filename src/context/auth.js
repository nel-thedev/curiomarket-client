import { createContext, useContext, useEffect, useState } from 'react';
import { baseUrl } from '../services/baseUrl';
import axios from 'axios';
import { get } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  };

  const removeToken = () => {
    localStorage.removeItem('authToken');
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem('authToken');
    //headers thing see with daniel
    if (storedToken) {
      get(`/auth/verify`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          setUser(null);
          removeToken();
          navigate('/auth/login');
        });
    } else {
      setUser(null);
    }
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
    navigate('/');
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ storeToken, authenticateUser, logOutUser, setUser, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
