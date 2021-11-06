import { SortProps } from '../components/offersList/offers-list';
import { CitiesProps, OfferProp } from '../mock/offer';
import { AuthoriztionProps } from '../utils/constants';
import { UserDataProps } from './reducer';

export enum ActionType {
  ChangeCity = 'app/changeCity',
  SetupOffers = 'app/setupOffers',
  ChangeSort = 'app/changeSort',
  ChangeAuthorization = 'user/changeAuthoriztion',
  SetUserData = 'user/setUserData',
  Logout = 'user/logout',
}

export const getChangeCity = (city: CitiesProps) => ({
  type: ActionType.ChangeCity,
  payload: {
    city,
  },
} as const);

export const getSetupOffers = (offers: OfferProp[]) => ({
  type: ActionType.SetupOffers,
  payload: {
    newOffers:offers,
  },
} as const);

export const getChangeSort = (sort: SortProps) => ({
  type: ActionType.ChangeSort,
  payload: {
    sort,
  },
} as const);

export const getChangeAuthorization = (status: AuthoriztionProps) => ({
  type: ActionType.ChangeAuthorization,
  payload: {
    status,
  },
} as const);

export const getSetUserData = (data:UserDataProps ) => ({
  type: ActionType.SetUserData,
  payload: {
    data,
  },
} as const);

export const getLogout = () => ({
  type: ActionType.Logout,
} as const);

export type Actions = ReturnType<typeof getChangeSort> | ReturnType<typeof getChangeCity> | ReturnType<typeof getSetupOffers> | ReturnType<typeof getChangeAuthorization> | ReturnType<typeof getSetUserData> | ReturnType<typeof getLogout>;
