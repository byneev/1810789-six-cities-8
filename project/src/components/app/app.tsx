import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../login/login';
import Main from '../main/main';
import Room from '../room/room';
import { AppRoute, AuthorizationStatus } from '../../utils/constants';
import NotFound from '../not-found/not-found';
import React from 'react';
import PrivateRoute from '../private-route/private-route';
import Favorites from '../favorites/favorites';
import {  OfferProp } from '../../mock/offer';
import { ReviewProp } from '../../mock/review';

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
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route path={AppRoute.MAIN} exact>
            <Main {...props} />;
          </Route>
          <Route path={AppRoute.LOGIN} exact>
            <Login location={props.cities[0]} />
          </Route>
          <PrivateRoute path={AppRoute.FAVORITES} authorizationStatus={authorizationStatus} render={() => <Favorites {...props} />} />
          <Route path='/offer/:id' exact component={Room} />
          <Route >
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>);
    </React.Fragment>);
}

export default App;
