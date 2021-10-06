import { Link } from 'react-router-dom';
import { AppRoute } from '../../utils/constants';

function NotFound():JSX.Element {
  return (
    <>
      <p>Error 404</p>
      <p>Page not found</p>
      <Link to={AppRoute.MAIN} />
    </>
  );
}

export default NotFound;
