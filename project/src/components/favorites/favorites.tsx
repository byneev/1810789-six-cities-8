/* eslint-disable no-console */
import { Link } from 'react-router-dom';
import { AppRoute } from '../../utils/constants';
import type { AppProps } from '../app/app';
import LocationItem from '../location-item/location-item';
//TODO: li.favorites__locations-items отдельный компонент, создается мапом по массиву cities
function Favorites(props: AppProps): JSX.Element {
  const favoriteOffers = props.offers.filter((item) => item.isFavorite);

  const actualCities:string[] = props.cities.filter((city) => favoriteOffers.filter((item) => item.city.name === city).length !== 0);
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.MAIN}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.MAIN}>
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to={AppRoute.LOGIN}>
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {actualCities.map((city) => <LocationItem key={city} city={city} offers={favoriteOffers.filter((item) => item.city.name === city)} />)}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.MAIN}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>);
}

export default Favorites;
