import axios, { AxiosInstance } from 'axios';

export const createAPI = ():AxiosInstance => {
  const api = axios.create({
    baseURL: 'https://8.react.pages.academy/six-cities',
    timeout: 5000,
  });

  return api;
};
