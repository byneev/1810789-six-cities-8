import { createAction } from '@reduxjs/toolkit';
import { CitiesProps, OfferProp } from '../types/offer';
import { ReviewProp } from '../types/review';
import { AuthoriztionProps, SortProps } from '../utils/constants';
import { UserDataProps } from './reducers/user-reducer';

export enum ActionType {
  ChangeCity = 'app/changeCity',
  SetupOffers = 'app/setupOffers',
  ChangeSort = 'app/changeSort',
  ChangeAuthorization = 'user/changeAuthoriztion',
  SetUserData = 'user/setUserData',
  Logout = 'user/logout',
  SetCurrentOffer = 'app/setCurrentOffer',
  SetNearbyOffers = 'app/setNearbyOffers',
  SetCurrentComments = 'user/setCurrentComments',
  ChangeRating = 'user/changeRating',
  SetFavoritesOffers = 'app/setFavoritesOffers',
  SetActiveOffer = 'user/setActiveOffer',
  ChangeOffers = 'app/changeOffers',
  SetFormCondition = 'add/setFormCondition',
  SetIsDataSended = 'user/setIsDataSended',
}

export const changeCity = createAction(ActionType.ChangeCity, (currentCity: CitiesProps, currentSort: SortProps) => ({
  payload: {
    currentCity,
    currentSort,
  },
}));

export const setupOffers = createAction<OfferProp[]>(ActionType.SetupOffers);

export const changeSort = createAction<SortProps>(ActionType.ChangeSort);

export const changeAuthorization = createAction<AuthoriztionProps>(ActionType.ChangeAuthorization);

export const setUserData = createAction<UserDataProps>(ActionType.SetUserData);

export const logout = createAction<UserDataProps>(ActionType.Logout);

export const setCurrentOffer = createAction<OfferProp>(ActionType.SetCurrentOffer);

export const setNearbyOferrs = createAction<OfferProp[]>(ActionType.SetNearbyOffers);

export const setCurrentComments = createAction<ReviewProp[]>(ActionType.SetCurrentComments);

export const changeRating = createAction<number | null>(ActionType.ChangeRating);

export const setFavoritesOffers = createAction<OfferProp[]>(ActionType.SetFavoritesOffers);

export const setActiveOffer = createAction<number | null>(ActionType.SetActiveOffer);

export const changeOffers = createAction<OfferProp>(ActionType.ChangeOffers);

export const setIsFormDisabled = createAction<boolean>(ActionType.SetFormCondition);

export const setIsDataSended = createAction<boolean>(ActionType.SetIsDataSended);
