import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import {  Router } from 'react-router-dom';
import { SortType } from '../../utils/constants';
import Sort from './sort';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  WebApp: {
    currentSort: SortType.Popular,
  },
});

describe('Test Sort component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Sort />
        </Router>
      </Provider>,
    );
    expect(screen.getByText(/Price: low to high/i)).toBeInTheDocument();
    expect(screen.getByText(/Price: high to low/i)).toBeInTheDocument();
    expect(screen.getByText(/Top rated first/i)).toBeInTheDocument();
  });
});
