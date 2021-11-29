import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { City } from '../../utils/constants';
import CitiesList from './cities-list';
import { mockClientOffers } from '../cities/cities.test';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  WebApp: {
    currentCity: City.COLOGNE,
    offers: mockClientOffers,
  },
});

describe('Test CitiesList component', () => {
  it('Should render correctly and set currentCity element to --active', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <CitiesList />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('Paris')).not.toHaveClass('tabs__item tabs__item--active');
    expect(screen.getByTestId('Cologne')).toHaveClass('locations__item-link tabs__item tabs__item--active');
  });
  // it('Should render corretcly after click CitiesList anchors', () => {
  //   render(
  //     <Provider store={store}>
  //       <Router history={history}>
  //         <CitiesList />
  //         <Cities />
  //       </Router>
  //     </Provider>,
  //   );

  //   userEvent.click(screen.getByTestId('Brussels'));
  //   expect(screen.getByText(/places to stay in Brussels/i)).toBeInTheDocument();
});
