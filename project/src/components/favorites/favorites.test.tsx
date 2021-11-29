import { configureMockStore } from '@jedmao/redux-mock-store';
import { mockClientOffers } from '../cities/cities.test';
import { userData } from '../../store/reducers/user-reducer.test';
import { createMemoryHistory } from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import { Route, Router } from 'react-router-dom';
import Favorites from './favorites';
import { APIRoute, AuthorizationStatus, SortType } from '../../utils/constants';
import PrivateRoute from '../private-route/private-route';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Test Favorites component', () => {
  it('Should not render Paris block and should render Cologne block', () => {
    const store = mockStore({
      WebApp: {
        favoritesOffers: mockClientOffers,
        currentSort: SortType.Popular,
      },
      User: {
        userData: userData,
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Favorites />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Cologne/i)).toBeInTheDocument();
    expect(screen.queryByText(/Paris/i)).not.toBeInTheDocument();
  });

  it('Should render empty Favorites', () => {
    const store = mockStore({
      WebApp: {
        favoritesOffers: [],
        currentSort: SortType.Popular,
      },
      User: {
        userData: userData,
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Favorites />
        </Router>
      </Provider>,
    );
    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });

  it('Should redirect to Login', () => {
    const store = mockStore({
      WebApp: {
        favoritesOffers: [],
        currentSort: SortType.Popular,
      },
      User: {
        userData: userData,
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });
    history.push(APIRoute.Favorite);
    render(
      <Provider store={store}>
        <Router history={history}>
          <PrivateRoute path={APIRoute.Favorite} render={() => <Favorites />} />
          <Route path={APIRoute.Login} render={() => (<h1>Login</h1>)} exact />
        </Router>
      </Provider>,
    );
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
});
