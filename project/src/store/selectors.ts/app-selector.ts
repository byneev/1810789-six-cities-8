import { CitiesProps, OfferProp } from '../../mock/offer';
import { SortProps } from '../../utils/constants';
import { NameSpace, RootStateProps } from '../reducers/root-reducer';

export const getCurrentCity = (state: RootStateProps):CitiesProps => state[NameSpace.webApp].currentCity;

export const getOffers = (state: RootStateProps):OfferProp[] => state[NameSpace.webApp].offers;

export const getCurrentSort = (state: RootStateProps):SortProps => state[NameSpace.webApp].currentSort;

export const getIsLoading = (state: RootStateProps):boolean => state[NameSpace.webApp].isLoading;

export const getCurrentOffer = (state: RootStateProps): OfferProp | null => state[NameSpace.webApp].currentOffer;

export const getNearbyOffers = (state: RootStateProps): OfferProp[] => state[NameSpace.webApp].nearbyOffers;

export const getFavoriteOffers = (state: RootStateProps): OfferProp[] => state[NameSpace.webApp].favoritesOffers;
