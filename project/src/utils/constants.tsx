import { CitiesProps } from '../mock/offer';

export type CityProp = {
  AMSTERDAM: CitiesProps,
  DUSSELDORF: CitiesProps,
  HAMBURG: CitiesProps,
  BRUSSELS: CitiesProps,
  COLOGNE: CitiesProps,
  PARIS: CitiesProps,
};

export const AppRoute = {
  MAIN: '/',
  LOGIN: '/login',
  FAVORITES: '/favorites',
  ROOM: '/offer/',
};

export const AuthorizationStatus = {
  IS_OK: 'authorization is ok',
  IS_NOT_OK: 'authorization is not ok',
};

export const City:CityProp = {
  AMSTERDAM: 'Amsterdam',
  DUSSELDORF: 'Dusseldorf',
  HAMBURG: 'Hamburg',
  BRUSSELS: 'Brussels',
  COLOGNE: 'Cologne',
  PARIS: 'Paris',
};

export const Container = {
  FAVORITES: 'Favorites',
  MAIN: 'Main',
  ROOM: 'Room',
};

export enum APIRoute {
  Hotels = '/hotels',
  Favorite = '/favorite',
  Login = '/login',
  Logout = '/logout',
}
