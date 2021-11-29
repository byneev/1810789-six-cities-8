import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import {render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppRoute, AuthorizationStatus, City } from '../../utils/constants';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import Login from './login';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Test Login component', () => {
  it('Should render login correctly', () => {
    const store = mockStore({
      WebApp: {
        currentCity: City.HAMBURG,
      },
      User: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });
    history.push(AppRoute.LOGIN);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route path={AppRoute.LOGIN}>
            <Login onSubmitData={() => history.push(AppRoute.MAIN)} />
          </Route>
          <Route path={AppRoute.MAIN} render={() => (<h1>Main</h1>)} exact />
        </Router>
      </Provider>,
    );
    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
    userEvent.type(screen.getByTestId(/e-mail/i), 'admin');
    userEvent.type(screen.getByTestId(/password/i), 'asdf1234');
    expect(screen.getByTestId('e-mail')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
  });

  it('Should redirect to Main component', () => {
    const store = mockStore({
      WebApp: {
        currentCity: City.HAMBURG,
      },
      User: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route path={AppRoute.LOGIN}>
            <Login onSubmitData={() => history.push(AppRoute.MAIN)} exact />
          </Route>
          <Route path={AppRoute.MAIN} render={() => (<h1>Main</h1>)} exact />
        </Router>
      </Provider>,
    );
    expect(screen.getByText(/Main/i)).toBeInTheDocument();
  });
});
