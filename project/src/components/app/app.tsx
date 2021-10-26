import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../login/login';
import Main from '../main/main';
import { AppRoute, AuthorizationStatus } from '../../utils/constants';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import Favorites from '../favorites/favorites';
import { OfferProp } from '../../mock/offer';
import { ReviewProp } from '../../mock/review';
import RoomPage from '../room-page/room-page';

const authorizationStatus: string = AuthorizationStatus.IS_OK;

export type OfferProps = {
  offers: OfferProp[];
}

export type ReviewProps = {
  reviews: ReviewProp[];
}

export type AppProps = OfferProps & ReviewProps & {
  cities: string[];
}

function App(props: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.MAIN} exact>
          <Main />
        </Route>
        <Route path={AppRoute.LOGIN} exact>
          <Login />
        </Route>
        <PrivateRoute path={AppRoute.FAVORITES} authorizationStatus={authorizationStatus} render={() => <Favorites {...props} />} />
        <Route path='/offer/:id' exact render={
          (routeProps) => <RoomPage offers={props.offers} {...routeProps} />
        }
        />
        <Route >
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>);
}

export default App;
