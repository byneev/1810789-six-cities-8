import { CitiesProps, OfferProp } from '../mock/offer';

export const getOffersByCity = (offers: OfferProp[], city: CitiesProps):OfferProp[] => offers.filter((offer) => offer.city.name === city);
