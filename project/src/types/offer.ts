import { City } from '../utils/constants';

export type LocationProps = {
  latitude: number,
  longitude: number,
  zoom: number,
}

export type CityProps = {
  location: LocationProps,
  name: CitiesProps,
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
  isFavorite: boolean | undefined,
  isPremium: boolean | undefined,
  location: LocationProps,
  maxAdults: number | undefined
  previewImage: string | undefined,
  price: number
  rating: number
  title: string,
  type: string,
}

export type CitiesProps = |'Amsterdam' |'Dusseldorf' |'Hamburg' |'Brussels' |'Cologne' | 'Paris';

export const cities:CitiesProps[] = [
  City.PARIS,
  City.COLOGNE,
  City.BRUSSELS,
  City.AMSTERDAM,
  City.HAMBURG,
  City.DUSSELDORF,
];
