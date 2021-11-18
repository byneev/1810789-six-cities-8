import { ReviewProp } from '../../mock/review';
import { AuthoriztionProps, AuthorizationStatus } from '../../utils/constants';
import { Actions, ActionType } from './../actions';
import { Token } from './../token';

export type UserDataProps = {
  avatarUrl?: string,
  email: string,
  id: number,
  isPro?: false,
  name: string,
  token: Token,
}

export type StateProps = {
  authorizationStatus: AuthoriztionProps,
  userData:UserDataProps,
  currentComments: ReviewProp[],
  currentRating: number,
  isFavorite: boolean,
  activeOfferId: number | null,
};

const initialState:StateProps = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {
    name:'',
    email:'',
    token:'',
    id:0,
    isPro:undefined,
    avatarUrl:'',
  },
  currentComments: [],
  currentRating: 3,
  isFavorite: false,
  activeOfferId: null,
};

export const userReducer = (state:StateProps = initialState, action: Actions):StateProps => {
  switch (action.type) {
    case ActionType.ChangeAuthorization:
      return {...state, authorizationStatus: action.payload.authorizationStatus};
    case ActionType.SetUserData:
      return {...state, userData: action.payload.data};
    case ActionType.Logout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth, userData: initialState.userData};
    case ActionType.SetCurrentComments:
      return {...state, currentComments: action.payload.comments};
    case ActionType.ChangeRating:
      return {...state, currentRating: action.payload.rating};
    case ActionType.AddToFavorites:
      return {...state, isFavorite: true};
    case ActionType.SetActiveOffer:
      return {...state, activeOfferId: action.payload.activeOfferId};
    default:
      return state;
  }
};

