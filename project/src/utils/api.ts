/* eslint-disable no-console */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getToken } from '../store/token';
import { HTTPStatusCode } from './constants';

export type DefaultFunctionProps = () => void;

export const createAPI = (onUnauthorize: DefaultFunctionProps, onNotFound: DefaultFunctionProps, onBadRequest: DefaultFunctionProps):AxiosInstance => {
  const api = axios.create({
    baseURL: 'https://8.react.pages.academy/six-cities',
    timeout: 5000,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === HTTPStatusCode.Unauthorized) {
        onUnauthorize();
      }
      if (error.response?.status === HTTPStatusCode.NotFound) {
        onNotFound();
      }
      if (error.response?.status === HTTPStatusCode.BadRequest) {
        onBadRequest();
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
