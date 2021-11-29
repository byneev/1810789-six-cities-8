import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { mockReviews } from '../../store/reducers/user-reducer.test';
import ReviewsList from './reviews-list';

const mockStore = configureMockStore();
const store = mockStore({
  User: {
    currentComments: mockReviews,
  },
});
const history = createMemoryHistory();

describe('Test ReviewsList component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewsList />
        </Router>
      </Provider>,
    );
    expect(screen.getAllByText(/Hello, are you hear me?/i)).toHaveLength(mockReviews.length);
  });
});
