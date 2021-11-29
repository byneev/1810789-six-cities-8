import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, Container } from '../../utils/constants';
import { mockClientOffers } from '../cities/cities.test';
import Room from './room';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

describe('Test Room component', () => {
  it('If NoAuth when click on favorites button should redirect to /login', () => {
    const store = mockStore({
      User: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route>
            <Room container={Container.MAIN} room={mockClientOffers[0]}/>
          </Route>
          <Route path={AppRoute.LOGIN} render={() => <h1>Login Path</h1>} exact />
        </Router>
      </Provider>,
    );
    userEvent.click(screen.getByTestId(/add-favorites/i));
    expect(screen.getByText(/Login Path/i)).toBeInTheDocument();
  });

  it('If Auth when click on favorites button should change button class to active', async () => {
    const store = mockStore({
      User: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Room container={Container.MAIN} room={mockClientOffers[0]}/>
        </Router>
      </Provider>,
    );
    userEvent.click(screen.getByTestId(/add-favorites/i));
    await setTimeout(() => expect(screen.getByTestId(/add-favorites/i)).toHaveClass('place-card__bookmark-button--active'), 50);
  });

  it('Click on title should redirect to RoomPage', () => {
    const store = mockStore({
      User: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route>
            <Room container={Container.MAIN} room={mockClientOffers[0]}/>
          </Route>
          <Route path={`${AppRoute.ROOM}${mockClientOffers[0].id}`} render={() => <h1>RoomPage Path</h1>} exact />
        </Router>
      </Provider>,
    );
    userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(/RoomPage Path/i)).toBeInTheDocument();
  });
});
