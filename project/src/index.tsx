import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { cities, offers } from './mock/offer';
import { reviews } from './mock/review';
import { reducer } from './store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import { getSetupOffers } from './store/actions';
import thunk from 'redux-thunk';
import { createAPI } from './utils/api';

const api = createAPI();
const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk.withExtraArgument(api)),
));
store.dispatch(getSetupOffers(offers));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={offers} reviews={reviews} cities={cities}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
