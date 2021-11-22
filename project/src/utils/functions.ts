import { CitiesProps, OfferProp } from '../types/offer';
import { ReviewProp } from '../types/review';
import { SortProps, SortType } from './constants';

export const getOffersByCity = (offers: OfferProp[], city: CitiesProps): OfferProp[] => offers.filter((offer) => offer.city.name === city);

export const sortBySortType = (offers: OfferProp[], sort: SortProps): OfferProp[] => {
  switch (sort) {
    case SortType.HighFirst:
      return offers.slice().sort((offerA: OfferProp, offerB: OfferProp) => offerB.price - offerA.price);
    case SortType.LowFirst:
      return offers.slice().sort((offerA: OfferProp, offerB: OfferProp) => offerA.price - offerB.price);
    case SortType.RatedFirst:
      return offers.slice().sort((offerA: OfferProp, offerB: OfferProp) => offerB.rating - offerA.rating);
    case SortType.Popular:
      return offers;
  }
};

export const sortReviewsByData = (reviews: ReviewProp[]): ReviewProp[] => reviews.slice().sort((reviewA: ReviewProp, reviewB: ReviewProp) => Date.parse(reviewB.date) - Date.parse(reviewA.date));
