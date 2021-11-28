/* eslint-disable no-console */

import { APIRoute, AuthorizationStatus } from '../utils/constants';
import { changeAuthorization, setCurrentComments, setCurrentOffer, setFavoritesOffers, setIsDataSended, setIsFormDisabled, setNearbyOferrs, setupOffers, setUserData } from './actions';
import { OfferProp } from '../types/offer';
import { convertCommentsToClient, convertOffersToClient, convertUserDataToClient, ServerCommentProp, ServerOfferProp } from '../utils/adapter';
import { Action, ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AuthData } from '../components/login/login';
import { removeData, setData } from './token';
import { toast } from 'react-toastify';
import { CommentData } from '../components/review-form/review-form';
import { RootStateProps } from './reducers/root-reducer';
import { UserDataProps } from './reducers/user-reducer';

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, RootStateProps, AxiosInstance, Action>;

export const loadOffersFromServer = (): ThunkActionResult => async (dispatch, _getState, api) => {
  const { data } = await api.get<ServerOfferProp[]>(APIRoute.Hotels);
  const offersForClient = data.map((offer: ServerOfferProp): OfferProp => convertOffersToClient(offer));
  dispatch(setupOffers(offersForClient));
};

export const checkAuthorizeStatus = (): ThunkActionResult => async (dispatch, _getState, api) => {
  try {
    await api.get(APIRoute.Login);
    dispatch(changeAuthorization(AuthorizationStatus.Auth));
  } catch (error) {
    toast.warn('Failed authorize to Six cities');
  }
};

export const loginToCite =
  ({ login: email, password }: AuthData): ThunkActionResult =>
    async (dispatch, _getState, api) => {
      const { data } = await api.post<UserDataProps>(APIRoute.Login, { email, password });
      setData(data.token, data);
      dispatch(changeAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserData(convertUserDataToClient(data)));
    };

export const logoutFromCite = (): ThunkActionResult => async (dispatch, _getState, api) => {
  await api.delete(APIRoute.Logout);
  removeData();
  dispatch(setupOffers([]));
  dispatch(setFavoritesOffers([]));
  dispatch(loadOffersFromServer());
};

export const loadCurrentOffer =
  (id: number): ThunkActionResult =>
    async (dispatch, _getState, api) => {
      const offer = await api.get(`${APIRoute.Hotels}/${id}`);
      dispatch(setCurrentOffer(convertOffersToClient(offer.data)));
    };

export const loadNearbyOffers =
  (id: number): ThunkActionResult =>
    async (dispatch, _getState, api) => {
      const offers = await api.get(`${APIRoute.Hotels}/${id}/nearby`);
      dispatch(setNearbyOferrs(offers.data.map((offer: ServerOfferProp) => convertOffersToClient(offer))));
    };

export const loadCurrentComments =
  (id: number): ThunkActionResult =>
    async (dispatch, _getState, api) => {
      const comments = await api.get(`${APIRoute.Comments}/${id}`);
      dispatch(setCurrentComments(comments.data.map((commentFromServer: ServerCommentProp) => convertCommentsToClient(commentFromServer))));
    };

export const sendComment =
  (id: number, { comment, rating }: CommentData): ThunkActionResult =>
    async (dispatch, _getState, api) => {
      await api.post(`${APIRoute.Comments}/${id}`, { comment, rating })
        .then((comments) => {
          dispatch(setCurrentComments(comments.data.map((commentFromServer: ServerCommentProp) => convertCommentsToClient(commentFromServer))));
          dispatch(setIsDataSended(true));
        })
        .catch(() => {
          dispatch(setIsDataSended(false));
          toast.warn('Error has occurred with sending comment to server');
        })
        .finally(() => {
          dispatch(setIsDataSended(false));
          dispatch(setIsFormDisabled(false));
        });
    };


export const getFavoritesOffers = (): ThunkActionResult => async (dispatch, _getState, api) => {
  const offers = await api.get(APIRoute.Favorite);
  dispatch(setFavoritesOffers(offers.data.map((offer: ServerOfferProp) => convertOffersToClient(offer))));
};

export const addToFavorites =
  (id: number, status: number): ThunkActionResult =>
    async (dispatch, _getState, api) => {
      await api.post(`${APIRoute.Favorite}/${id}/${status}`);
      dispatch(getFavoritesOffers());
    };
