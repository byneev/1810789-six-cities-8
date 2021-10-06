import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Favorites from '../favorites/favorites';
import Login from '../login/login';
import Main from '../main/main';
import Room from '../room/room';
import { AppRoute, AuthorizationStatus } from '../../utils/constants';
import NotFound from '../not-found/not-found';
import React from 'react';
import PrivateRoute from '../private-route/private-route';

export type RoomProps = {
  type: string;
  name: string;
  price: number;
  id: number;
  isFavorite: boolean;
  isPremium: boolean;
}

export type AppProps = {
  rooms: RoomProps[],
  count: number;
  location: string;
};
function App(props: AppProps): JSX.Element {
  return (<React.Fragment>
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.MAIN} exact>
          <Main {...props} />;
        </Route>
        <Route path={AppRoute.LOGIN} exact>
          <Login location={props.location} />
        </Route>
        //TODO
        <PrivateRoute path={AppRoute.FAVORITES} authorizationStatus={AuthorizationStatus.IS_NOT_OK} exact>
          <Favorites {...props} />
        </PrivateRoute>
        <Route path={AppRoute.ROOM} exact>
          <Room {...props} />
        </Route>
        <Route >
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>);
          </React.Fragment>);
}

export default App;
