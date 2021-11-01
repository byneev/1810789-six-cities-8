/* eslint-disable no-case-declarations */
import { SortProps, SortType } from '../components/offersList/offers-list';
import { CitiesProps, OfferProp } from '../mock/offer';
import { Actions, ActionType } from './actions';

export type StateProps = {
  currentCity: CitiesProps,
  offers: OfferProp[],
  currentSort: SortProps,
}

const initialState:StateProps = {
  currentCity: 'Paris',
  offers: [],
  currentSort: SortType.Popular,
};

export const reducer = (state:StateProps = initialState, action: Actions):StateProps => {
  switch (action.type) {
    case ActionType.SetupOffers:
      return {...state, offers: action.payload.newOffers};
    case ActionType.ChangeCity:
      return {...state, currentCity: action.payload.city, currentSort: initialState.currentSort};
    case ActionType.ChangeSort:
      return {...state, currentSort: action.payload.sort};
    default:
      return state;
  }
};

