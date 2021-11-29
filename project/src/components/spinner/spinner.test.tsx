import { screen, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Spinner from './spinner';

const history = createMemoryHistory();

describe('Test Spinner component', () => {
  it('Should render correctly', () => {
    render(
      <Router history={history}>
        <Spinner />
      </Router>,
    );
    expect(screen.getByText(/Six Cities is loading.../i)).toBeInTheDocument();
  });
});
