import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { initialState } from '../../store/reducers/app-reducer';
import { City } from '../../utils/constants';
import Cities from './cities';

const clientOffer = initialState.currentOffer;
export const mockClientOffers = [
  Object.assign({}, clientOffer, {city: {
    name: City.AMSTERDAM,
    location: {
      latitude: 52.379189,
      longitude: 4.899431,
      zoom: 10,
    },
  },
  id: 1}),
  Object.assign({}, clientOffer, {city: {
    name: City.BRUSSELS,
    location: {
      latitude: 52.379189,
      longitude: 4.899431,
      zoom: 10,
    },
  },
  id: 2}),
  Object.assign({}, clientOffer, {city: {
    name: City.COLOGNE,
    location: {
      latitude: 52.379189,
      longitude: 4.899431,
      zoom: 10,
    },
  },
  id: 3}),
  Object.assign({}, clientOffer, {city: {
    name: City.DUSSELDORF,
    location: {
      latitude: 52.379189,
      longitude: 4.899431,
      zoom: 10,
    },
  },
  id: 4}),
  Object.assign({}, clientOffer, {city: {
    name: City.HAMBURG,
    location: {
      latitude: 52.379189,
      longitude: 4.899431,
      zoom: 10,
    },
  },
  id: 5}),
];

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  WebApp:{
    currentCity: City.PARIS,
    offers: mockClientOffers,
  },
});

describe('Test Cities component', () => {
  it('Should render empty cities.tsx when currentOffers = 0', () => {
    render(
      <Provider store={store} >
        <Router history={history} >
          <Cities />
        </Router>
      </Provider>,
    );
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });
});
