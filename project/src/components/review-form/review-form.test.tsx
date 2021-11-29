import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import ReviewForm from './review-form';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ID } from '../../store/api-actions.test';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Test ReviewForm component', () => {
  it('Form should be disabled and cleared', () => {
    const store = mockStore({
      User: {
        currentRating: 5,
        isFormDisabled: true,
        isDataSended: true,
      },
    });
    render(
      <Provider store={store} >
        <Router history={history} >
          <ReviewForm id={ID} />
        </Router>
      </Provider>,
    );
    expect(screen.getByTestId(/submit/i)).toBeDisabled();
    expect(screen.getByTestId(/textarea/i)).toBeDisabled();
    expect(screen.getByTestId(/textarea/i)).toHaveValue('');
    const inputs = screen.getAllByTestId('input');
    inputs.forEach((input) => expect(input).toBeDisabled());
  });

  it('Form should be disabled then enabled', async () => {
    const store = mockStore({
      User: {
        currentRating: 5,
        isFormDisabled: false,
        isDataSended: false,
      },
    });
    render(
      <Provider store={store} >
        <Router history={history} >
          <ReviewForm id={ID} />
        </Router>
      </Provider>,
    );
    expect(screen.getByTestId(/submit/i)).toBeDisabled();
    expect(screen.getByTestId(/textarea/i)).toBeEnabled();
    userEvent.type(screen.getByTestId(/textarea/i), 'This texarea field should enable when we input 30 or more symbols');
    userEvent.click(screen.getByTestId(/submit/i));
    expect(screen.getByTestId(/submit/i)).toBeDisabled();
    expect(screen.getByTestId(/textarea/i)).toBeDisabled();
  });
});
