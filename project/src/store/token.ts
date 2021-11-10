export type Token = string;
const TOKEN_KEY = 'six-cities-token';

export const setToken = (token: Token):void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = ():Token => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ?? '';
};

export const removeToken = ():void => {
  localStorage.removeItem(TOKEN_KEY);
};


