import { createReducer } from '@reduxjs/toolkit';
import { CitiesProps, OfferProp } from '../../mock/offer';
import { SortProps, SortType } from '../../utils/constants';
import { changeCity, changeSort, setCurrentOffer, setFavoritesOffers, setNearbyOferrs, setupOffers } from './../actions';

export type AppStateProps = {
  currentCity: CitiesProps,
  offers: OfferProp[],
  currentSort: SortProps,
  isLoading: boolean,
  currentOffer: OfferProp | null,
  nearbyOffers: OfferProp[],
  favoritesOffers: OfferProp[],
};

const popular = SortType.Popular;

const initialState:AppStateProps = {
  currentCity: 'Paris',
  offers: [],
  currentSort: popular,
  isLoading: true,
  currentOffer: null,
  nearbyOffers: [],
  favoritesOffers: [],
};

export const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setupOffers, (state, {payload}) => {
      state.offers = payload;
      state.isLoading = false;
    })
    .addCase(changeCity, (state, {payload}) => {
      state.currentCity = payload.currentCity;
      state.currentSort = payload.currentSort;
    })
    .addCase(changeSort, (state, {payload}) => {
      state.currentSort = payload;
    })
    .addCase(setCurrentOffer, (state, {payload}) => {
      state.currentOffer = payload;
    })
    .addCase(setNearbyOferrs, (state, {payload}) => {
      state.nearbyOffers = payload;
    })
    .addCase(setFavoritesOffers, (state, {payload}) => {
      state.favoritesOffers = payload;
    });
});
