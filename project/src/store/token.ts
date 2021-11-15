/* eslint-disable no-console */
import { UserDataProps } from './reducer';

export type Token = string;
const TOKEN_KEY = 'six-cities-token';
const USER_KEY = 'six-cities-user';

export const setData = (token: Token, user: UserDataProps):void => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getToken = ():Token => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ?? '';
};

export const getUser = ():UserDataProps  | null => {
  const serverUser = localStorage.getItem(USER_KEY);
  if (serverUser !== null) {
    return JSON.parse(serverUser);
  }
  return null;
};

export const removeData = ():void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};


