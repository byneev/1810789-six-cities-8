import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import {render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppRoute, AuthorizationStatus, City, SortType } from '../../utils/constants';
import { userData } from '../../store/reducers/user-reducer.test';
import { mockClientOffers } from '../cities/cities.test';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import Main from './main';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Test Main component', () => {
  it('Should redirect to Login', () => {
    const store = mockStore({
      WebApp: {
        currentSort: SortType.Popular,
        currentCity: City.PARIS,
        offers: mockClientOffers,
      },
      User: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: userData,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route path={AppRoute.MAIN} exact>
            <Main />
          </Route>
          <Route path={AppRoute.LOGIN} render={() => (<h1>Login</h1>)} exact />
          <Route path={AppRoute.FAVORITES} render={() => (<h1>Favorites</h1>)} exact />
        </Router>
      </Provider>,
    );
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(/logout/i));
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    history.push(AppRoute.MAIN);
    userEvent.click(screen.getByTestId(/favorites/i));
    expect(screen.getByText(/Favorites/i)).toBeInTheDocument();
  });

  it('Should redirect to Login', () => {
    const store = mockStore({
      WebApp: {
        currentSort: SortType.Popular,
        currentCity: City.PARIS,
        offers: mockClientOffers,
      },
      User: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: userData,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route path={AppRoute.MAIN} exact>
            <Main />
          </Route>
          <Route path={AppRoute.LOGIN} render={() => (<h1>Login</h1>)} exact />
          <Route path={AppRoute.FAVORITES} render={() => (<h1>Favorites</h1>)} exact />
        </Router>
      </Provider>,
    );
    expect(screen.queryByText(/Sign out/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId(/login/i));
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

});
