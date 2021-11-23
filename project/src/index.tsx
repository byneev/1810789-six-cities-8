/* eslint-disable no-console */
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { createAPI } from './utils/api';
import { checkAuthorizeStatus, getFavoritesOffers, loadOffersFromServer } from './store/api-actions';
import { changeAuthorization, setUserData } from './store/actions';
import { AppRoute, AuthorizationStatus } from './utils/constants';
import { Redirect } from 'react-router-dom';
import { getUser } from './store/token';
import { rootReducer } from './store/reducers/root-reducer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = createAPI(
  () => {
    store.dispatch(changeAuthorization(AuthorizationStatus.NoAuth));
  },
  () => <Redirect to={AppRoute.NOTFOUND} />,
  () => toast.error('Something goes wrong'),
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

store.dispatch(loadOffersFromServer());
store.dispatch(checkAuthorizeStatus());

const userDataFromLocalStorage = getUser();
if (userDataFromLocalStorage) {
  store.dispatch(setUserData(userDataFromLocalStorage));
  store.dispatch(getFavoritesOffers());
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
