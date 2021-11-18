import { connect, ConnectedProps } from 'react-redux';
import { Redirect, Route, RouteProps} from 'react-router';
import { RootStateProps } from '../../store/reducers/root-reducer';
import { AppRoute, AuthorizationStatus } from '../../utils/constants';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element,
}

const mapStateToProps = ({User}:RootStateProps) => ({
  authorizationStatus: User.authorizationStatus,
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
