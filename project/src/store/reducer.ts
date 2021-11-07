/* eslint-disable no-case-declarations */
import { SortProps, SortType } from '../components/offersList/offers-list';
import { CitiesProps, OfferProp } from '../mock/offer';
import { AuthoriztionProps, AuthorizationStatus } from '../utils/constants';
import { Actions, ActionType } from './actions';
import { Token } from './token';

export type UserDataProps = {
  avatarUrl?: string,
  email: string,
  id: number,
  isPro?: false,
  name: string,
  token: Token,
}

export type StateProps = {
  currentCity: CitiesProps,
  offers: OfferProp[],
  currentSort: SortProps,
  isLoading: boolean,
  authorizationStatus: AuthoriztionProps,
  userData:UserDataProps,
  currentOffer: OfferProp | null,
  nearbyOffers: OfferProp[],
  isNeedRefreshMarkers: boolean,
};

const initialState:StateProps = {
  currentCity: 'Paris',
  offers: [],
  currentSort: SortType.Popular,
  isLoading: true,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {
    name:'',
    email:'',
    token:'',
    id:0,
    isPro:undefined,
    avatarUrl:'',
  },
  currentOffer: null,
  nearbyOffers: [],
  isNeedRefreshMarkers: false,
};

export const reducer = (state:StateProps = initialState, action: Actions):StateProps => {
  switch (action.type) {
    case ActionType.SetupOffers:
      return {...state, offers: action.payload.newOffers, isLoading: false};
    case ActionType.ChangeCity:
      return {...state, currentCity: action.payload.city, currentSort: initialState.currentSort};
    case ActionType.ChangeSort:
      return {...state, currentSort: action.payload.sort};
    case ActionType.ChangeAuthorization:
      return {...state, authorizationStatus: action.payload.status};
    case ActionType.SetUserData:
      return {...state, userData: action.payload.data};
    case ActionType.Logout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    case ActionType.SetCurrentOffer:
      return {...state, currentOffer: action.payload.offer};
    case ActionType.SetNearbyOffers:
      return {...state, nearbyOffers: action.payload.offers};
    case ActionType.RefreshMarkers:
      return {...state, isNeedRefreshMarkers: action.payload.isNeedRefreshMarkers};
    default:
      return state;
  }
};

