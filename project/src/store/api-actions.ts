/* eslint-disable no-console */
import { APIRoute, AuthorizationStatus, City } from '../utils/constants';
import { Actions, getChangeAuthorization, getChangeRating, getSetCurrentComments, getSetCurrentOffer, getSetCurrentOffers, getSetFavoritesOffers, getSetNearbyOferrs, getSetupOffers, getSetUserData } from './actions';
import { OfferProp } from '../mock/offer';
import { convertOffersToClient, convertUserDataToClient, ServerOfferProp } from '../utils/adapter';
import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { StateProps, UserDataProps } from './reducer';
import { AxiosInstance } from 'axios';
import { AuthData } from '../components/login/login';
import { removeData, setData } from './token';
import { toast } from 'react-toastify';
import { CommentData } from '../components/review-form/review-form';
import { getOffersByCity } from '../utils/functions';

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, StateProps, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<StateProps, AxiosInstance, Actions>;

export const loadOffersFromServer = ():ThunkActionResult =>
  async (dispatch, _getState, api):Promise<void> => {
    const {data} = await api.get<ServerOfferProp[]>(APIRoute.Hotels);
    const offersForClient = data.map((offer:ServerOfferProp):OfferProp => convertOffersToClient(offer));
    dispatch(getSetupOffers(offersForClient));
    dispatch(getSetCurrentOffers(getOffersByCity(offersForClient, City.PARIS)));
  };

export const checkAuthorizeStatus = ():ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(getChangeAuthorization(AuthorizationStatus.Auth));

    } catch (error) {
      toast.warn('Failed authorize to Six cities');
    }
  };

export const loginToCite = ({login: email, password}:AuthData):ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.post<UserDataProps>(APIRoute.Login, {email, password});
    setData(data.token, data);
    dispatch(getChangeAuthorization(AuthorizationStatus.Auth));
    dispatch(getSetUserData(convertUserDataToClient(data)));
  };

export const logoutFromCite = ():ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.delete(APIRoute.Logout);
    removeData();
    dispatch(getChangeAuthorization(AuthorizationStatus.NoAuth));
  };

export const loadCurrentOffer = (id:number):ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const offer = await api.get(`${APIRoute.Hotels}/${id}`);
    dispatch(getSetCurrentOffer(convertOffersToClient(offer.data)));
  };

export const loadNearbyOffers = (id:number):ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const offers = await api.get(`${APIRoute.Hotels}/${id}/nearby`);
    dispatch(getSetNearbyOferrs(offers.data.map((offer:ServerOfferProp) => convertOffersToClient(offer))));
  };

export const loadCurrentComments = (id:number):ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const comments = await api.get(`${APIRoute.Comments}/${id}`);
    dispatch(getSetCurrentComments(comments.data));
  };

export const sendComment = (id:number, {comment, rating}:CommentData):ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const comments = await api.post(`${APIRoute.Comments}/${id}`, {comment, rating});
    dispatch(getSetCurrentComments(comments.data));
    dispatch(getChangeRating(3));
  };

export const getFavoritesOffers = ():ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const offers = await api.get(APIRoute.Favorite);
    dispatch(getSetFavoritesOffers(offers.data.map((offer:ServerOfferProp) => convertOffersToClient(offer))));
  };

export const addToFavorites = (id: number, status: number):ThunkActionResult =>
  async (dispatch, getState, api) => {
    const changedOffer = await api.post(`${APIRoute.Favorite}/${id}/${status}`);
    dispatch(getSetFavoritesOffers(getState().favoriteOffers.map((offer) => offer.id === changedOffer.data.id ? changedOffer.data : offer)));
    console.log(getState().currentOffers);
    dispatch(getSetCurrentOffers(getState().currentOffers.map((offer) => offer.id === changedOffer.data.id ? changedOffer.data : offer)));
    // здесь косяк
  };
