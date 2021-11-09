/* eslint-disable no-console */
import { Router as BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../login/login';
import Main from '../main/main';
import { AppRoute} from '../../utils/constants';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import Favorites from '../favorites/favorites';
import { OfferProp } from '../../mock/offer';
import { ReviewProp } from '../../mock/review';
import RoomPage from '../room-page/room-page';
import { StateProps } from '../../store/reducer';
import { connect, ConnectedProps } from 'react-redux';
import Spinner from '../spinner/spinner';
import browserHistory from '../../utils/history';
import { store } from '../..';
import { loadCurrentComments, loadCurrentOffer, loadNearbyOffers } from '../../store/api-actions';

export type OfferProps = {
  offers: OfferProp[];
}

export type ReviewProps = {
  reviews: ReviewProp[];
}

export type AppProps = OfferProps & ReviewProps & {
  cities: string[];
}

const mapStateToProps = ({isLoading}:StateProps) => ({
  isLoading,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedAppProps = AppProps & PropsFromRedux;

function App(props: ConnectedAppProps): JSX.Element {
  const {isLoading} = props;
  if (isLoading) {
    return (
      <Spinner />
    );
  }
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route path={AppRoute.MAIN} exact>
          <Main />
        </Route>
        <Route path={AppRoute.LOGIN} render={({history}) => (
          <Login onSubmitData={() => history.push(AppRoute.MAIN)} />
        )} exact
        />
        <PrivateRoute path={AppRoute.FAVORITES} render={() => <Favorites {...props} />} />
        <Route path='/offer/:id' exact render={
          (routeProps) => {
            const id = +routeProps.match.params.id;
            store.dispatch(loadCurrentOffer(id));
            store.dispatch(loadNearbyOffers(id));
            store.dispatch(loadCurrentComments(id));

            return <RoomPage {...routeProps}/>;
          }
        }
        />
        <Route >
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>);
}

export default connector(App);
export {App};
