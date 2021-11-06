import { CitiesProps } from '../mock/offer';

export type CityProp = {
  AMSTERDAM: CitiesProps,
  DUSSELDORF: CitiesProps,
  HAMBURG: CitiesProps,
  BRUSSELS: CitiesProps,
  COLOGNE: CitiesProps,
  PARIS: CitiesProps,
};

export type AuthoriztionProps =  AuthorizationStatus.Auth | AuthorizationStatus.NoAuth | AuthorizationStatus.Unknown;


export const AppRoute = {
  MAIN: '/',
  LOGIN: '/login',
  FAVORITES: '/favorites',
  ROOM: '/offer/',
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

export enum AuthorizationStatus {
  Auth = 'Auth',
  NoAuth = 'NoAuth',
  Unknown = 'Unknown',
}

export enum HTTPStatusCode {
  Unauthorized = 401,
}
