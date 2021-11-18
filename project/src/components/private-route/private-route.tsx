import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps} from 'react-router';
import { getAuthorizationStatus } from '../../store/selectors.ts/user-selector';
import { AppRoute, AuthorizationStatus } from '../../utils/constants';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element,
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  return (
    <Route path={props.path} exact render={() =>
      authorizationStatus === AuthorizationStatus.Auth ? props.render() : <Redirect to={AppRoute.LOGIN} />}
    />
  );
}


export default PrivateRoute;
