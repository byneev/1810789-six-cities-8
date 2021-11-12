/* eslint-disable no-console */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getToken } from '../store/token';
import { HTTPStatusCode } from './constants';

export const createAPI = (onUnauthorize: () => void, onNotFound: () => void):AxiosInstance => {
  const api = axios.create({
    baseURL: 'https://8.react.pages.academy/six-cities',
    timeout: 5000,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === HTTPStatusCode.Unauthorized) {
        console.log('Hui');
        onUnauthorize();
      }
      if (error.response?.status === HTTPStatusCode.NotFound) {
        onNotFound();
      }
      return Promise.reject(error);
    },
  );

  api.interceptors.request.use(
    (config:AxiosRequestConfig) => {
      const token = getToken();
      if (token) {
        config.headers['x-token'] = token;
      }
      return config;
    },
  );

  return api;
};
