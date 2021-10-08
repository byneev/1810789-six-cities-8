import { Redirect, Route, RouteProps} from 'react-router';
import { AppRoute, AuthorizationStatus } from '../../utils/constants';

type PrivateRouteProps = RouteProps & {
  authorizationStatus: string;
  render: () => JSX.Element,
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  return (
    <Route path={props.path} exact render={() =>
      props.authorizationStatus === AuthorizationStatus.IS_OK ? props.render() : <Redirect to={AppRoute.LOGIN} />}
    />
  );
}


export default PrivateRoute;
