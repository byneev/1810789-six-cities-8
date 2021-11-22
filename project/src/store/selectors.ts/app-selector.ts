import { createSelector } from 'reselect';
import { CitiesProps, OfferProp } from '../../types/offer';
import { City, SortProps } from '../../utils/constants';
import { NameSpace, RootStateProps } from '../reducers/root-reducer';

export const getCurrentCity = (state: RootStateProps): CitiesProps => state[NameSpace.webApp].currentCity;

export const getOffers = (state: RootStateProps): OfferProp[] => state[NameSpace.webApp].offers;

export const getOffersFromParis = createSelector(getOffers, (offers: OfferProp[]) => offers.filter((offer) => offer.city.name === City.PARIS));

export const getOffersFromBrussels = createSelector(getOffers, (offers: OfferProp[]) => offers.filter((offer) => offer.city.name === City.BRUSSELS));

export const getOffersFromDusseldorf = createSelector(getOffers, (offers: OfferProp[]) => offers.filter((offer) => offer.city.name === City.DUSSELDORF));

export const getOffersFromAmsterdam = createSelector(getOffers, (offers: OfferProp[]) => offers.filter((offer) => offer.city.name === City.AMSTERDAM));

export const getOffersFromCologne = createSelector(getOffers, (offers: OfferProp[]) => offers.filter((offer) => offer.city.name === City.COLOGNE));

export const getCurrentSort = (state: RootStateProps): SortProps => state[NameSpace.webApp].currentSort;

export const getIsLoading = (state: RootStateProps): boolean => state[NameSpace.webApp].isLoading;

export const getCurrentOffer = (state: RootStateProps): OfferProp => state[NameSpace.webApp].currentOffer;

export const getNearbyOffers = (state: RootStateProps): OfferProp[] => state[NameSpace.webApp].nearbyOffers;

export const getFavoriteOffers = (state: RootStateProps): OfferProp[] => state[NameSpace.webApp].favoritesOffers;

export const getOffersSelectorByCity = (currentCity: CitiesProps): ((state: RootStateProps) => OfferProp[]) => {
  switch (currentCity) {
    case City.PARIS:
      return getOffersFromParis;
    case City.BRUSSELS:
      return getOffersFromBrussels;
    case City.DUSSELDORF:
      return getOffersFromDusseldorf;
    case City.AMSTERDAM:
      return getOffersFromAmsterdam;
    case City.COLOGNE:
      return getOffersFromCologne;
    default:
      return getOffers;
  }
};
