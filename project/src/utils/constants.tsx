import { CitiesProps } from '../types/offer';

export type CityProp = {
  AMSTERDAM: CitiesProps,
  DUSSELDORF: CitiesProps,
  HAMBURG: CitiesProps,
  BRUSSELS: CitiesProps,
  COLOGNE: CitiesProps,
  PARIS: CitiesProps,
};

export type AuthoriztionProps =  AuthorizationStatus.Auth | AuthorizationStatus.NoAuth | AuthorizationStatus.Unknown;

export enum SortType {
  HighFirst = 'Price: high to low',
  LowFirst = 'Price: low to high',
  RatedFirst = 'Top rated first',
  Popular = 'Popular',
}

export type SortProps = SortType.HighFirst | SortType.LowFirst | SortType.Popular | SortType.RatedFirst;

export const AppRoute = {
  MAIN: '/',
  LOGIN: '/login',
  FAVORITES: '/favorites',
  ROOM: '/offer/',
  NOTFOUND: '/404',
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
  Comments = '/comments',
}

export enum AuthorizationStatus {
  Auth = 'Auth',
  NoAuth = 'NoAuth',
  Unknown = 'Unknown',
}

export enum HTTPStatusCode {
  Unauthorized = 401,
  NotFound = 404,
  BadRequest = 400,
}
