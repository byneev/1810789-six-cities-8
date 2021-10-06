import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { mockData } from './mock/data';

ReactDOM.render(
  <React.StrictMode>
    <App {...mockData} />
  </React.StrictMode>,
  document.getElementById('root'),
);
