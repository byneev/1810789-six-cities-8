import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, City, SortType } from '../../utils/constants';
import { mockClientOffers } from '../cities/cities.test';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';
import RoomPage from './room-page';
import { mockReviews, userData } from '../../store/reducers/user-reducer.test';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

describe('Test Room component', () => {
  it('If NoAuth when click on favorites button should redirect to /login', async () => {
    const store = mockStore({
      WebApp: {
        currentSort: SortType.Popular,
        offers: mockClientOffers,
        currentOffer: mockClientOffers[0],
        nearbyOffers: mockClientOffers,
        favoritesOffers: mockClientOffers,
        currentCity: City.AMSTERDAM,
      },
      User: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: userData,
        currentComments: mockReviews,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route>
            <RoomPage />
          </Route>
          <Route path={AppRoute.LOGIN} render={() => <h1>Login Path</h1>} exact />
        </Router>
      </Provider>,
    );
    userEvent.click(screen.getByTestId(/add-favorites-roompage/i));
    await setTimeout(() => expect(screen.getByText(/Login Path/i)).toBeInTheDocument(), 50);
  });

  it('If Auth when click on favorites button should change button class to active', async () => {
    const store = mockStore({
      WebApp: {
        currentSort: SortType.Popular,
        offers: mockClientOffers,
        currentOffer: mockClientOffers[0],
        nearbyOffers: mockClientOffers,
        favoritesOffers: mockClientOffers,
        currentCity: City.AMSTERDAM,
      },
      User: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: userData,
        currentComments: mockReviews,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route>
            <RoomPage />
          </Route>
        </Router>
      </Provider>,
    );
    userEvent.click(screen.getByTestId(/add-favorites-roompage/i));
    await setTimeout(() => expect(screen.getByTestId(/add-favorites-roompage/i)).toHaveClass('property__bookmark-button--active'), 50);
  });
});
