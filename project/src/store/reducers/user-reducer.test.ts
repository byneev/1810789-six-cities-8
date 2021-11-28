import { AuthorizationStatus } from '../../utils/constants';
import { changeAuthorization, changeRating, logout, setActiveOffer, setCurrentComments, setIsDataSended, setIsFormDisabled, setUserData } from '../actions';
import { initialState, UserDataProps, userReducer } from './user-reducer';
import { ReviewProp } from '../../types/review';

export const userData : UserDataProps = {
  name: 'Oleg',
  email: 'Popov',
  token: 'xcdfs345',
  id: 15,
  isPro: false,
  avatarUrl: '/img/ava.jpg',
};

export const reviewData : ReviewProp = {
  comment: 'Hello, are you hear me?',
  date: new Date().toISOString(),
  id: 7,
  rating: 4,
  user: {
    avatarUrl: 'img/ava1.png',
    id: 3,
    isPro: false,
    name: 'Oleg Kupryaev',
  },
};

describe('Test UserReducer', () => {
  it('Should set field authoriztionStatus to Auth', () => {
    const state = Object.assign({}, initialState);
    expect(userReducer(state, changeAuthorization(AuthorizationStatus.Auth)))
      .toEqual({...state, authorizationStatus: AuthorizationStatus.Auth});
  });

  it('Should set field userData to payload', () => {
    const state = Object.assign({}, initialState);
    expect(userReducer(state, setUserData(userData)))
      .toEqual({...state, userData: userData});
  });

  it('Should set field userData to payload and authorizationStatus to noAuth', () => {
    const state = Object.assign({}, initialState);
    expect(userReducer(state, logout(userData)))
      .toEqual({...state, userData: userData, authorizationStatus: AuthorizationStatus.NoAuth});
  });

  it('Should set field curentComments to payload', () => {
    const state = Object.assign({}, initialState);
    const comments = new Array(3).fill(reviewData);
    expect(userReducer(state, setCurrentComments(comments)))
      .toEqual({...state, currentComments: comments});
  });

  it('Should set field currentRating to payload', () => {
    const state = Object.assign({}, initialState);
    expect(userReducer(state, changeRating(reviewData.rating)))
      .toEqual({...state, currentRating: reviewData.rating});
  });

  it('should set field currentOffer to payload', () => {
    const state = Object.assign({}, initialState);
    expect(userReducer(state, setActiveOffer(reviewData.id)))
      .toEqual({...state, activeOfferId: reviewData.id});
  });

  it('Should set isFormDisabled to payload', () => {
    const state = Object.assign({}, initialState);
    expect(userReducer(state, setIsFormDisabled(true)))
      .toEqual({...state, isFormDisabled: true});
  });

  it('Should set isDataSended to payload', () => {
    const state = Object.assign({}, initialState);
    expect(userReducer(state, setIsDataSended(true)))
      .toEqual({...state, isDataSended: true});
  });
});
