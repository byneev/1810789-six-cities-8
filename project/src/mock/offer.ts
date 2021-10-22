import { City } from '../utils/constants';

export type LocationProps = {
  latitude: number,
  longitude: number,
  zoom: number,
}

export type CityProps = {
  location: LocationProps,
  name: string,
}

export type HostProps = {
  avatarUrl: string,
  id: number,
  isPro: boolean,
  name: string,
}

export type OfferProp = {
  bedrooms: number,
  city: CityProps,
  description: string,
  goods: string[],
  host: HostProps,
  id: number,
  images: string[],
  isFavorite: boolean,
  isPremium: boolean,
  location: LocationProps,
  maxAdults: number
  previewImage: string,
  price: number
  rating: number
  title: string,
  type: string,
}

export const offers: OfferProp[] =
  [
    {
      'bedrooms': 3,
      'city': {
        'location': {
          'latitude': 52.379189,
          'longitude': 4.899431,
          'zoom': 10,
        },
        'name': 'Amsterdam',
      },
      'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
      'goods': ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
      'host': {
        'avatarUrl': 'img/1.png',
        'id': 3,
        'isPro': true,
        'name': 'Angelina',
      },
      'id': 1,
      'images': ['img/1.png', 'img/2.png'],
      'isFavorite': false,
      'isPremium': false,
      'location': {
        'latitude': 52.3909553943508,
        'longitude': 4.85309666406198,
        'zoom': 8,
      },
      'maxAdults': 4,
      'previewImage': 'https://via.placeholder.com/260x200',
      'price': 120,
      'rating': 4.8,
      'title': 'Beautiful & luxurious studio at great location',
      'type': 'apartment',
    },
    {
      'bedrooms': 2,
      'city': {
        'location': {
          'latitude': 52.379189,
          'longitude': 4.899431,
          'zoom': 10,
        },
        'name': 'Amsterdam',
      },
      'description': 'Sicturesque that hides behind a a river by the unique lightness of Amsterdam.',
      'goods': ['Heating', 'Cable TV', 'Coffee machine', 'Dishwasher'],
      'host': {
        'avatarUrl': 'img/2.png',
        'id': 4,
        'isPro': true,
        'name': 'Valera',
      },
      'id': 2,
      'images': ['img/3.png', 'img/4.png'],
      'isFavorite': true,
      'isPremium': false,
      'location': {
        'latitude': 52.369553943508,
        'longitude': 4.85309666406198,
        'zoom': 8,
      },
      'maxAdults': 4,
      'previewImage': 'https://via.placeholder.com/260x200',
      'price': 110,
      'rating': 4.7,
      'title': 'Awful room at great location',
      'type': 'apartment',
    },
    {
      'bedrooms': 1,
      'city': {
        'location': {
          'latitude': 52.379189,
          'longitude': 4.899431,
          'zoom': 10,
        },
        'name': 'Amsterdam',
      },
      'description': 'Crazy moonshadow place by the unique lightness of Amsterdam.',
      'goods': ['Heating', 'Cable TV', 'Washing machine', 'Coffee machine'],
      'host': {
        'avatarUrl': 'img/3.png',
        'id': 5,
        'isPro': false,
        'name': 'Dimon',
      },
      'id': 3,
      'images': ['img/5.png', 'img/6.png'],
      'isFavorite': true,
      'isPremium': true,
      'location': {
        'latitude': 52.3909553943508,
        'longitude': 4.929309666406198,
        'zoom': 8,
      },
      'maxAdults': 4,
      'previewImage': 'https://via.placeholder.com/260x200',
      'price': 60,
      'rating': 3.8,
      'title': 'Go away studio at nice location',
      'type': 'apartment',
    },
    {
      'bedrooms': 5,
      'city': {
        'location': {
          'latitude': 52.379189,
          'longitude': 4.899431,
          'zoom': 10,
        },
        'name': 'Amsterdam',
      },
      'description': 'Amazing simple dimple house with unstoppable environments.',
      'goods': ['Heating', 'Cable TV', 'Coffee machine', 'Dishwasher'],
      'host': {
        'avatarUrl': 'img/4.png',
        'id': 7,
        'isPro': true,
        'name': 'Sanya',
      },
      'id': 4,
      'images': ['img/7.png', 'img/8.png'],
      'isFavorite': false,
      'isPremium': false,
      'location': {
        'latitude': 52.3809553943508,
        'longitude': 4.939309666406198,
        'zoom': 8,
      },
      'maxAdults': 4,
      'previewImage': 'https://via.placeholder.com/260x200',
      'price': 137,
      'rating': 4.5,
      'title': 'What a great location. Look at this',
      'type': 'apartment',
    },
  ];

export const cities:string[] = [
  City.PARIS,
  City.COLOGNE,
  City.BRUSSELS,
  City.AMSTERDAM,
  City.HAMBURG,
  City.DUSSELDORF,
];
