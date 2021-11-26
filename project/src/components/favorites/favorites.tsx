import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cities } from '../../types/offer';
import { changeAuthorization, changeCity } from '../../store/actions';
import { logoutFromCite } from '../../store/api-actions';
import { getFavoriteOffers } from '../../store/selectors.ts/app-selector';
import { getUserData } from '../../store/selectors.ts/user-selector';
import { AppRoute, AuthorizationStatus, City, SortType } from '../../utils/constants';
import LocationItem from '../location-item/location-item';

function Favorites(): JSX.Element {
  const userData = useSelector(getUserData);
  const favoritesOffers = useSelector(getFavoriteOffers);
  const dispatch = useDispatch();
  const actualCities: string[] = cities.filter((city) => favoritesOffers.filter((item) => item.city.name === city).length !== 0);
  return (
    <div className={favoritesOffers.length !== 0 ? 'page' : 'page page--favorites-empty'}>
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <div className='header__left'>
              <Link
                onClick={() => {
                  dispatch(changeCity(City.PARIS, SortType.Popular));
                }}
                className='header__logo-link header__logo-link--active'
                to={AppRoute.MAIN}
              >
                <img className='header__logo' src='img/logo.svg' alt='6 cities logo' width='81' height='41' />
              </Link>
            </div>
            <nav className='header__nav'>
              <ul className='header__nav-list'>
                <li className='header__nav-item user'>
                  <Link className='header__nav-link header__nav-link--profile' to={AppRoute.FAVORITES}>
                    <div className='header__avatar-wrapper user__avatar-wrapper'></div>
                    <span className='header__user-name user__name'>{userData.email}</span>
                  </Link>
                </li>
                <li className='header__nav-item'>
                  <Link onClick={() => {
                    dispatch(changeAuthorization(AuthorizationStatus.NoAuth));
                    dispatch(logoutFromCite());
                  }} className='header__nav-link' to={AppRoute.LOGIN}
                  >
                    <span className='header__signout'>Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className={favoritesOffers.length !== 0 ? 'page__main page__main--favorites' : 'page__main--favorites-empty'}>
        <div className='page__favorites-container container'>
          <section className={favoritesOffers.length !== 0 ? 'favorites' : 'favorites favorites--empty'}>
            <h1 className='visually-hidden'>Favorites{favoritesOffers.length === 0 ? ' (empty)' : ''}</h1>
            {favoritesOffers.length === 0 ? (
              <div className='favorites__status-wrapper'>
                <b className='favorites__status'>Nothing yet saved.</b>
                <p className='favorites__status-description'>Save properties to narrow down search or plan your future trips.</p>
              </div>
            ) : (
              <>
                <h1 className='favorites__title'>Saved listing</h1>
                <ul className='favorites__list'>
                  {actualCities.map((city) => (
                    <LocationItem key={city} offers={favoritesOffers.filter((item) => item.city.name === city)} />
                  ))}
                </ul>
              </>
            )}
          </section>
        </div>
      </main>
      <footer className='footer container'>
        <Link className='footer__logo-link' to={AppRoute.MAIN}>
          <img className='footer__logo' src='img/logo.svg' alt='6 cities logo' width='64' height='33' />
        </Link>
      </footer>
    </div>
  );
}

export default Favorites;
