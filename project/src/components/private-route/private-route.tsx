import { connect, ConnectedProps } from 'react-redux';
import { Redirect, Route, RouteProps} from 'react-router';
import { StateProps } from '../../store/reducer';
import { AppRoute, AuthorizationStatus } from '../../utils/constants';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element,
}

const mapStateToProps = ({authorizationStatus}:StateProps) => ({
  authorizationStatus,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedPrivateProps = PropsFromRedux & PrivateRouteProps;

function PrivateRoute(props: ConnectedPrivateProps): JSX.Element {
  const {authorizationStatus} = props;
  return (
    <Route path={props.path} exact render={() =>
      authorizationStatus === AuthorizationStatus.Auth ? props.render() : <Redirect to={AppRoute.LOGIN} />}
    />
  );
}


export default connector(PrivateRoute);
export {PrivateRoute};
