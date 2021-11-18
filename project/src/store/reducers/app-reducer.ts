import { SortProps, SortType } from '../../components/offersList/offers-list';
import { CitiesProps, OfferProp } from '../../mock/offer';
import { Actions, ActionType } from './../actions';

export type AppStateProps = {
  currentCity: CitiesProps,
  offers: OfferProp[],
  currentSort: SortProps,
  isLoading: boolean,
  currentOffer: OfferProp | null,
  nearbyOffers: OfferProp[],
  favoritesOffers: OfferProp[],
};

const initialState:AppStateProps = {
  currentCity: 'Paris',
  offers: [],
  currentSort: SortType.Popular,
  isLoading: true,
  currentOffer: null,
  nearbyOffers: [],
  favoritesOffers: [],
};

export const appReducer = (state:AppStateProps = initialState, action: Actions):AppStateProps => {
  switch (action.type) {
    case ActionType.SetupOffers:
      return {...state, offers: action.payload.newOffers, isLoading: false};
    case ActionType.ChangeCity:
      return {...state, currentCity: action.payload.city, currentSort: initialState.currentSort};
    case ActionType.ChangeSort:
      return {...state, currentSort: action.payload.sort};
    case ActionType.SetCurrentOffer:
      return {...state, currentOffer: action.payload.offer};
    case ActionType.SetNearbyOffers:
      return {...state, nearbyOffers: action.payload.offers};
    case ActionType.SetFavoritesOffers:
      return {...state, favoritesOffers: action.payload.favoritesOffers};
    default:
      return state;
  }
};

