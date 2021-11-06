import { APIRoute } from '../utils/constants';
import { Actions, getSetupOffers } from './actions';
import { OfferProp } from '../mock/offer';
import { convertOffersToClient, ServerOfferProp } from '../utils/adapter';
import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { StateProps } from './reducer';
import { AxiosInstance } from 'axios';

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, StateProps, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<StateProps, AxiosInstance, Actions>;

export const loadOffersFromServer = ():ThunkActionResult =>
  async (dispatch, _getState, api):Promise<void> => {
    const {data} = await api.get<ServerOfferProp[]>(APIRoute.Hotels);
    const offersForClient = data.map((offer:ServerOfferProp):OfferProp => convertOffersToClient(offer));
    dispatch(getSetupOffers(offersForClient));
  };

