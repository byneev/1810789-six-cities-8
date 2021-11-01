import { SortProps } from '../components/offersList/offers-list';
import { CitiesProps, OfferProp } from '../mock/offer';

export enum ActionType {
  ChangeCity = 'app/changeCity',
  SetupOffers = 'app/setupOffers',
  ChangeSort = 'app/changeSort',
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

export type Actions = ReturnType<typeof getChangeSort> | ReturnType<typeof getChangeCity> | ReturnType<typeof getSetupOffers>;
