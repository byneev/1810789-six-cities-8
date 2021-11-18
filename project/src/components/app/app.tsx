/* eslint-disable no-console */
import { Router as BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../login/login';
import Main from '../main/main';
import { AppRoute} from '../../utils/constants';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import Favorites from '../favorites/favorites';
import RoomPage from '../room-page/room-page';
import { useSelector } from 'react-redux';
import Spinner from '../spinner/spinner';
import browserHistory from '../../utils/history';
import { store } from '../..';
import { loadCurrentComments, loadCurrentOffer, loadNearbyOffers } from '../../store/api-actions';
import { getIsLoading } from '../../store/selectors.ts/app-selector';

function App(): JSX.Element {
  const isLoading = useSelector(getIsLoading);
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
        <PrivateRoute path={AppRoute.FAVORITES} render={() => <Favorites />} />
        <Route path='/offer/:id' exact render={
          (routeProps) => {
            const id = +routeProps.match.params.id;
            store.dispatch(loadCurrentOffer(id));
            store.dispatch(loadNearbyOffers(id));
            store.dispatch(loadCurrentComments(id));

            return <RoomPage />;
          }
        }
        />
        <Route >
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>);
}

export default App;
