import { CitiesProps, OfferProp } from '../mock/offer';

export type ServerOfferProp = {
  'bedrooms': number,
  'city': {
    'location': {
      'latitude': number,
      'longitude': number,
      'zoom': number
    },
    'name': CitiesProps,
  },
  'description': string,
  'goods': string[],
  'host': {
    'avatar_url': string,
    'id': number,
    'is_pro': boolean,
    'name': string
  },
  'id': number,
  'images': string[],
  'is_favorite'?: boolean,
  'is_premium'?: boolean,
  'location': {
    'latitude': number,
    'longitude': number,
    'zoom': number
  },
  'max_adults'?: number,
  'preview_image'?: string,
  'price': number,
  'rating': number,
  'title': string,
  'type': string
}

export const convertOffersToClient = (offer: ServerOfferProp) : OfferProp => {
  if (offer.is_favorite === undefined || offer.is_premium === undefined || offer.max_adults === undefined || offer.preview_image === undefined) {
    throw new Error('Data from server is incorrect');
  }
  const clientOffer:OfferProp & Pick<ServerOfferProp, 'is_favorite' | 'is_premium' | 'max_adults' | 'preview_image'> =
  {...offer,
    isFavorite: offer.is_favorite,
    isPremium: offer.is_premium,
    maxAdults: offer.max_adults,
    previewImage: offer.preview_image,
    host: {
      name: offer.host.name,
      id: offer.host.id,
      avatarUrl: offer.host.avatar_url,
      isPro: offer.host.is_pro,
    },

  };
  delete clientOffer.is_favorite;
  delete clientOffer.is_premium;
  delete clientOffer.max_adults;
  delete clientOffer.preview_image;

  return clientOffer;
};

export const convertOffersToServer = (offers: OfferProp[]):OfferProp[] => offers;
