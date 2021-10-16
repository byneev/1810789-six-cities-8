import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { cities, offers } from './mock/offer';
import { reviews } from './mock/review';

ReactDOM.render(
  <React.StrictMode>
    <App offers={offers} reviews={reviews} cities={cities} />
  </React.StrictMode>,
  document.getElementById('root'),
);
