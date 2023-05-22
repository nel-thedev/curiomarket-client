import { createContext, useContext, useState } from 'react';
import { baseUrl } from '../services/baseUrl';
import axios from 'axios';
import { get } from '../services/authService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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
          console.log('USER', response.data);

          setUser(response.data);
        })
        .catch((error) => {
          setUser(null);
          removeToken();
        });
    } else {
      setUser(null);
    }
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  return (
    <AuthContext.Provider
      value={{ storeToken, authenticateUser, logOutUser, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
