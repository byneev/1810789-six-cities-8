/* eslint-disable no-console */
import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { cities, offers } from './mock/offer';
import { reviews } from './mock/review';
import { reducer } from './store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createAPI } from './utils/api';
import { checkAuthorizeStatus, loadOffersFromServer } from './store/api-actions';
import { getChangeAuthorization, getSetUserData } from './store/actions';
import { AppRoute, AuthorizationStatus } from './utils/constants';
import { Redirect } from 'react-router-dom';
import { getUser } from './store/token';

const api = createAPI(
  () => store.dispatch(getChangeAuthorization(AuthorizationStatus.NoAuth)),
  () => <Redirect to={AppRoute.NOTFOUND}/>,
);

export const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk.withExtraArgument(api)),
));
store.dispatch(loadOffersFromServer());
store.dispatch(checkAuthorizeStatus());
const userDataFromLocalStorage = getUser();
if (userDataFromLocalStorage) {
  store.dispatch(getSetUserData(userDataFromLocalStorage));
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={offers} reviews={reviews} cities={cities}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
