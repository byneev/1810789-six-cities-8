import { createAPI } from '../utils/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { RootStateProps } from './reducers/root-reducer';
import { Action } from '@reduxjs/toolkit';
import { APIRoute, AuthorizationStatus } from '../utils/constants';
import { initialState } from './reducers/app-reducer';
import { addToFavorites, checkAuthorizeStatus, getFavoritesOffers, loadCurrentComments, loadCurrentOffer, loadNearbyOffers, loadOffersFromServer, loginToCite, logoutFromCite, sendComment} from './api-actions';
import { changeAuthorization, setCurrentComments, setCurrentOffer, setFavoritesOffers, setIsDataSended, setIsFormDisabled, setNearbyOferrs, setupOffers, setUserData } from './actions';
import { AuthData } from '../components/login/login';
import { convertCommentsToClient, convertOffersToClient, convertUserDataToClient, ServerCommentProp, ServerOfferProp, ServerUserDataProp } from '../utils/adapter';
import { CommentData } from '../components/review-form/review-form';

const offers = new Array(3).fill(initialState.currentOffer);
export const defaultOfferFromServer : ServerOfferProp = {
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
    'avatar_url': 'img/1.png',
    'id': 3,
    'is_pro': true,
    'name': 'Angelina',
  },
  'id': 1,
  'images': ['img/1.png', 'img/2.png'],
  'is_favorite': false,
  'is_premium': false,
  'location': {
    'latitude': 52.3909553943508,
    'longitude': 4.85309666406198,
    'zoom': 8,
  },
  'max_adults': 4,
  'preview_image': 'https://via.placeholder.com/260x200',
  'price': 120,
  'rating': 4.8,
  'title': 'Beautiful & luxurious studio at great location',
  'type': 'apartment',
};

const serverOffers = new Array(3).fill(defaultOfferFromServer);

const authData: AuthData = {
  login: 'Andrey',
  password: 'k1488',
};

const serverUserData : ServerUserDataProp = {
  'avatar_url': 'img/ava3.png',
  'email': 'sss@xxx.ru',
  'id': 3,
  'is_pro': false,
  'name': 'Oleg Deripaska',
  'token': '669887',
};

export const serverReviewData : ServerCommentProp = {
  'comment': 'Hello, are you hear me?',
  'date': new Date().toISOString(),
  'id': 7,
  'rating': 4,
  'user': {
    'avatar_url': 'img/ava1.png',
    'id': 3,
    'is_pro': false,
    'name': 'Oleg Kupryaev',
  },
};

const clientOffers = serverOffers.map((offer: ServerOfferProp) => convertOffersToClient(offer));
const serverReviews = new Array(3).fill(serverReviewData);
const clientReviews = serverReviews.map((review: ServerCommentProp) => convertCommentsToClient(review));
const ID = 1;
const comment : CommentData = {
  comment: 'What a beautiful place',
  rating: 3,
};

describe('Test async actions', () => {
  const onUnauthorize = jest.fn();
  const onNotFound = jest.fn();
  const onBadRequest = jest.fn();
  const api = createAPI(onUnauthorize, onNotFound, onBadRequest);
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<RootStateProps, Action, ThunkDispatch<RootStateProps, typeof api, Action>>(middlewares);

  it('Should implement action setupOffer when GET /hotels', async () => {
    mockApi
      .onGet(APIRoute.Hotels)
      .reply(200, serverOffers);
    const store = mockStore();
    await store.dispatch(loadOffersFromServer());
    expect(store.getActions())
      .toEqual([setupOffers(offers)]);
  });

  it('Should implement action changeAuthoriaztion when GET /login', async () => {
    mockApi
      .onGet(APIRoute.Login)
      .reply(200, []);
    const store = mockStore();
    await store.dispatch(checkAuthorizeStatus());
    expect(store.getActions())
      .toEqual([changeAuthorization(AuthorizationStatus.Auth)]);
  });

  it('Should implement actions changeAuthoriaztion and setUserData when POST /login', async () => {
    const data = serverUserData;
    mockApi
      .onPost(APIRoute.Login)
      .reply(200, data);
    const store = mockStore();
    await store.dispatch(loginToCite(authData));
    expect(store.getActions())
      .toEqual([changeAuthorization(AuthorizationStatus.Auth), setUserData(convertUserDataToClient(serverUserData))]);
  });

  it('Should implement actions setupOffers, setFavoritesOffers, loadOffersFromServer when DELETE /logout', async () => {
    mockApi
      .onDelete(APIRoute.Logout)
      .reply(204);
    const store = mockStore();
    await store.dispatch(logoutFromCite());
    expect(store.getActions())
      .toEqual([setupOffers([]), setFavoritesOffers([])]);
  });

  it('Should implement action setCurrentOffer when GET /hotels:id', async () => {
    mockApi
      .onGet(`${APIRoute.Hotels}/${ID}`)
      .reply(200, defaultOfferFromServer);
    const store = mockStore();
    await store.dispatch(loadCurrentOffer(ID));
    expect(store.getActions())
      .toEqual([setCurrentOffer(convertOffersToClient(defaultOfferFromServer))]);
  });

  it('Should implement action setNearbyOferrs when GET /hotels/id/nearby', async () => {
    mockApi
      .onGet(`${APIRoute.Hotels}/${ID}/nearby`)
      .reply(200, serverOffers);
    const store = mockStore();
    await store.dispatch(loadNearbyOffers(ID));
    expect(store.getActions())
      .toEqual([setNearbyOferrs(clientOffers)]);
  });

  it('Should implement action setCurrentComments when GET /comments', async () => {
    mockApi
      .onGet(`${APIRoute.Comments}/${ID}`)
      .reply(200, serverReviews);
    const store = mockStore();
    await store.dispatch(loadCurrentComments(ID));
    expect(store.getActions())
      .toEqual([setCurrentComments(clientReviews)]);
  });

  it('Should implement action setFavoritesOffers when GET /favorite', async () => {
    mockApi
      .onGet(APIRoute.Favorite)
      .reply(200, serverOffers);
    const store = mockStore();
    await store.dispatch(getFavoritesOffers());
    expect(store.getActions())
      .toEqual([setFavoritesOffers(clientOffers)]);
  });

  it('Should implement getFavoritesOffers when POST /favorite/id/status', async () => {
    mockApi
      .onPost(`${APIRoute.Favorite}/${ID}/0`)
      .reply(200, defaultOfferFromServer);
    const store = mockStore();
    await store.dispatch(addToFavorites(ID, 0));
    // how to check that offer changed?
  });

  it('Should implement setCurrentComments, setIsDataSended, setIsFormDisabled when POST /comments/id', async () => {
    mockApi
      .onPost(`${APIRoute.Comments}/${ID}`)
      .reply(200, serverReviews);
    const store = mockStore();
    await store.dispatch(sendComment(ID, comment));
    expect(store.getActions())
      .toEqual([setCurrentComments(clientReviews), setIsDataSended(true), setIsDataSended(false), setIsFormDisabled(false)]);
    store.clearActions();
  });
});
