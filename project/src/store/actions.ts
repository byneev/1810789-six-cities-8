import { CitiesProps, OfferProp } from '../mock/offer';

export enum ActionType {
  ChangeCity = 'app/changeCity',
  SetupOffers = 'app/setupOffers',
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

export type Actions = ReturnType<typeof getChangeCity> | ReturnType<typeof getSetupOffers>;
