import { createContext, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../services/baseUrl';
import { get } from '../services/authService';

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
  const [stores, setStores] = useState([]);
  const [currentStore, setCurrentStore] = useState({});

  const getStores = () => {
    get('/store/all')
      .then((results) => {
        setStores(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCurrentStore = (storeId) => {
    get(`/store/shop/${storeId}`)
      .then((results) => {
        console.log('STORE ID', results.data);
        setCurrentStore(results.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <LoadingContext.Provider
      value={{
        getStores,
        stores,
        currentStore,
        getCurrentStore,
        setCurrentStore,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
