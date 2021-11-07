/* eslint-disable no-console */
import { APIRoute, AuthorizationStatus } from '../utils/constants';
import { Actions, getChangeAuthorization, getSetCurrentOffer, getSetupOffers, getSetUserData } from './actions';
import { OfferProp } from '../mock/offer';
import { convertOffersToClient, convertUserDataToClient, ServerOfferProp } from '../utils/adapter';
import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { StateProps, UserDataProps } from './reducer';
import { AxiosInstance } from 'axios';
import { AuthData } from '../components/login/login';
import { removeToken, setToken } from './token';
import { toast } from 'react-toastify';

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, StateProps, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<StateProps, AxiosInstance, Actions>;

export const loadOffersFromServer = ():ThunkActionResult =>
  async (dispatch, _getState, api):Promise<void> => {
    const {data} = await api.get<ServerOfferProp[]>(APIRoute.Hotels);
    const offersForClient = data.map((offer:ServerOfferProp):OfferProp => convertOffersToClient(offer));
    dispatch(getSetupOffers(offersForClient));
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
    setToken(data.token);
    dispatch(getChangeAuthorization(AuthorizationStatus.Auth));
    dispatch(getSetUserData(convertUserDataToClient(data)));
  };

export const logoutFromCite = ():ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.delete(APIRoute.Logout);
    removeToken();
    dispatch(getChangeAuthorization(AuthorizationStatus.NoAuth));
  };

export const loadCurrentOffer = (id:number):ThunkActionResult =>
  async (dispatch, _getState, api) => {
    console.log(`${APIRoute.Hotels}/:${id}`);
    const offer = await api.get(`${APIRoute.Hotels}/${id}`);
    dispatch(getSetCurrentOffer(convertOffersToClient(offer.data)));
  };
