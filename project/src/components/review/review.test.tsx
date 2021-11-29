import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { clientReviews } from '../../store/api-actions.test';
import Review from './review';
import { render, screen } from '@testing-library/react';

const history = createMemoryHistory();

describe('Test Review component', () => {
  it('Should render correct review', () => {
    render(
      <Router history={history}>
        <Review review={clientReviews[0]} />
      </Router>,
    );
    expect(screen.getByText(clientReviews[0].comment)).toBeInTheDocument();
  });
});

