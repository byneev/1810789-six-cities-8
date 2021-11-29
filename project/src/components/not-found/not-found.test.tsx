import {render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import NotFound from './not-found';

const history = createMemoryHistory();
describe('Test NotFound component', () => {
  it('Should render correctly', () => {
    render(
      <Router history={history}>
        <NotFound />,
      </Router>,
    );
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
});
