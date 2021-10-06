import { Route, RouteProps } from 'react-router';
import { AppRoute, AuthorizationStatus } from '../../utils/constants';

type PrivateRouteProps = RouteProps & {
  authorizationStatus: string,
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  return <Route  path={authorizationStatus === AuthorizationStatus.IS_OK ? AppRoute.FAVORITES : AppRoute.LOGIN} exact />;

}

export default PrivateRoute;
