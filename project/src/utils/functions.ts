/* eslint-disable no-console */
import { CitiesProps, OfferProp } from '../mock/offer';
import { SortProps, SortType } from './constants';

export const getOffersByCity = (offers: OfferProp[], city: CitiesProps):OfferProp[] => offers.filter((offer) => offer.city.name === city);

export const sortBySortType = (offers: OfferProp[], sort: SortProps): OfferProp[] => {
  switch (sort) {
    case SortType.HighFirst:
      return offers.sort((offerA: OfferProp, offerB: OfferProp) => offerB.price - offerA.price);
    case SortType.LowFirst:
      return offers.sort((offerA: OfferProp, offerB: OfferProp) => offerA.price - offerB.price);
    case SortType.RatedFirst:
      return offers.sort((offerA: OfferProp, offerB: OfferProp) => offerB.rating - offerA.rating);
    case SortType.Popular:
      return offers;
  }
};
