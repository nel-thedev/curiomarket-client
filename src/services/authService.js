import axios from 'axios';
import { baseUrl } from './baseUrl';

export const get = (route) => {
  let token = localStorage.getItem('authToken');

  return axios.get(baseUrl + route, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const post = (route, body) => {
  let token = localStorage.getItem('authToken');

  const api = axios.create({ baseUrl: baseUrl });

  api.interceptors.request.use(async (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;

      config.headers['Access-Control-Allow-Origin'] = '*';
    }
    return config;
  });

  return api.post(baseUrl + route, body);
  // return axios.post(baseUrl + route, body, {
  //   headers: { Authorization: `Bearer ${token}` },
  // });
};
