import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { AuthorizationStatus, Container, SortType } from '../../utils/constants';
import { mockClientOffers } from '../cities/cities.test';
import OffersList from './offers-list';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  WebApp: {
    currentSort: SortType.LowFirst,
  },
  User: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
});

describe('Test OffersList component', () => {
  it('Should render rooms correctly', () => {
    render(
      <Provider store={store} >
        <Router history={history} >
          <OffersList container={Container.MAIN} offers={mockClientOffers} />
        </Router>
      </Provider>,
    );
    expect(screen.getAllByText(/To bookmarks/i)).toHaveLength(mockClientOffers.length);
  });
});
