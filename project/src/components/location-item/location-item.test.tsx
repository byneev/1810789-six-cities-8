import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { clientOffers } from '../../store/api-actions.test';
import { AuthorizationStatus, SortType } from '../../utils/constants';
import LocationItem from './location-item';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  WebApp: {
    currentSort: SortType.HighFirst,
  },
  User: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
});

describe('Test LocationItem component', () => {
  it('LoctionOtem should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <LocationItem offers={clientOffers.slice(0, 1)} />
        </Router>
      </Provider>,
    );
    expect(screen.getByText(clientOffers[0].city.name)).toBeInTheDocument();
  });
});
