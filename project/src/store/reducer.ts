/* eslint-disable no-case-declarations */
import { CitiesProps, OfferProp } from '../mock/offer';
import { Actions, ActionType } from './actions';

export type StateProps = {
  currentCity: CitiesProps,
  offers: OfferProp[]
}

const initialState:StateProps = {
  currentCity: 'Paris',
  offers: [],
};

export const reducer = (state:StateProps = initialState, action: Actions):StateProps => {
  switch (action.type) {
    case ActionType.SetupOffers:
      return {...state, offers: action.payload.newOffers};
    case ActionType.ChangeCity:
      return {...state, currentCity: action.payload.city};
    default:
      return state;
  }
};

