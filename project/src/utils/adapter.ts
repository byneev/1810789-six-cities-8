import { CitiesProps, OfferProp } from '../mock/offer';
import { ReviewProp } from '../mock/review';
import { UserDataProps } from '../store/reducers/user-reducer';
import { Token } from '../store/token';

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

export type ServerUserDataProp = {
  'avatar_url'?: string,
  'email': string,
  'id': number,
  'is_pro'?: false,
  'name': string,
  'token': Token,
}

export type ServerCommentProp = {
  'comment': string,
  'date': string,
  'id': number,
  'rating': number,
  'user': {
    'avatar_url': string,
    'id': number,
    'is_pro': boolean,
    'name': string,
  }
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

export const convertCommentsToClient = (comment: ServerCommentProp):ReviewProp => {
  const clientComment:ReviewProp =
  {...comment,
    user: {
      name: comment.user.name,
      id: comment.user.id,
      avatarUrl: comment.user.avatar_url,
      isPro: comment.user.is_pro,
    },
  };
  return clientComment;
};

export const convertUserDataToClient = (userData: ServerUserDataProp):UserDataProps => {
  if (userData.avatar_url === undefined|| userData.is_pro === undefined) {
    throw new Error('User data from server is incorrect');
  }
  const clientUserData:UserDataProps & Pick<ServerUserDataProp, 'avatar_url' | 'is_pro'> =
  {...userData,
    avatarUrl: userData.avatar_url,
    isPro: userData.is_pro,
  };
  delete clientUserData.avatar_url;
  delete clientUserData.is_pro;

  return clientUserData;
};

