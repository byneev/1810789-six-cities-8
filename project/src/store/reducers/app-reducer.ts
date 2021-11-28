import { createReducer } from '@reduxjs/toolkit';
import { CitiesProps, OfferProp } from '../../types/offer';
import { SortProps, SortType } from '../../utils/constants';
import { changeCity, changeOffers, changeSort, setCurrentOffer, setFavoritesOffers, setNearbyOferrs, setupOffers } from './../actions';

export type AppStateProps = {
  currentCity: CitiesProps;
  offers: OfferProp[];
  currentSort: SortProps;
  isLoading: boolean;
  currentOffer: OfferProp;
  nearbyOffers: OfferProp[];
  favoritesOffers: OfferProp[];
};

const popular = SortType.Popular;

export const initialState: AppStateProps = {
  currentCity: 'Paris',
  offers: [],
  currentSort: popular,
  isLoading: true,
  nearbyOffers: [],
  favoritesOffers: [],
  currentOffer: {
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.379189,
        longitude: 4.899431,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    host: {
      avatarUrl: 'img/1.png',
      id: 3,
      isPro: true,
      name: 'Angelina',
    },
    id: 1,
    images: ['img/1.png', 'img/2.png'],
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
    maxAdults: 4,
    previewImage: 'https://via.placeholder.com/260x200',
    price: 120,
    rating: 4.8,
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
  },
};

export const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setupOffers, (state, { payload }) => {
      state.offers = payload;
      state.isLoading = false;
    })
    .addCase(changeCity, (state, { payload }) => {
      state.currentCity = payload.currentCity;
      state.currentSort = payload.currentSort;
    })
    .addCase(changeSort, (state, { payload }) => {
      state.currentSort = payload;
    })
    .addCase(setCurrentOffer, (state, { payload }) => {
      state.currentOffer = payload;
    })
    .addCase(setNearbyOferrs, (state, { payload }) => {
      state.nearbyOffers = payload;
    })
    .addCase(setFavoritesOffers, (state, { payload }) => {
      state.favoritesOffers = payload;
    })
    .addCase(changeOffers, (state, { payload }) => {
      state.offers[payload.id - 1] = payload;
    });
});
