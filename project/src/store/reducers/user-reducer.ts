import { createReducer } from '@reduxjs/toolkit';
import { ReviewProp } from '../../types/review';
import { AuthoriztionProps, AuthorizationStatus } from '../../utils/constants';
import { changeAuthorization, changeRating, logout, setActiveOffer, setCurrentComments, setIsFormDisabled, setUserData } from './../actions';
import { Token } from './../token';

export type UserDataProps = {
  avatarUrl?: string;
  email: string;
  id: number;
  isPro?: false;
  name: string;
  token: Token;
};

export type UserStateProps = {
  authorizationStatus: AuthoriztionProps;
  userData: UserDataProps;
  currentComments: ReviewProp[];
  currentRating: number;
  isFavorite: boolean;
  activeOfferId: number | null;
  isFormDisabled: boolean;
};

const initialState: UserStateProps = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {
    name: '',
    email: '',
    token: '',
    id: 0,
    isPro: undefined,
    avatarUrl: '',
  },
  currentComments: [],
  currentRating: 3,
  isFavorite: false,
  activeOfferId: null,
  isFormDisabled: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeAuthorization, (state, { payload }) => {
      state.authorizationStatus = payload;
    })
    .addCase(setUserData, (state, { payload }) => {
      state.userData = payload;
    })
    .addCase(logout, (state, { payload }) => {
      state.userData = payload;
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(setCurrentComments, (state, { payload }) => {
      state.currentComments = payload;
    })
    .addCase(changeRating, (state, { payload }) => {
      state.currentRating = payload;
    })
    .addCase(setActiveOffer, (state, { payload }) => {
      state.activeOfferId = payload;
    })
    .addCase(setIsFormDisabled, (state, { payload }) => {
      state.isFormDisabled = payload;
    });
});
