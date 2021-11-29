import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { userData } from '../../store/reducers/user-reducer.test';
import { AuthorizationStatus, City } from '../../utils/constants';
import {render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import MainEmpty from './main-empty';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  WebApp: {
    currentCity: City.BRUSSELS,

  },
  User: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: userData,
  },
});
describe('Test MainEmpty component', () => {
  it('Should render MainEmpty correctly', () => {
    render(
      <Provider store={store} >
        <Router history={history} >
          <MainEmpty />
        </Router>
      </Provider>,
    );
    expect(screen.getByText(/We could not find any property available at the moment in/i)).toBeInTheDocument();
  });
});

