import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutFromCite } from '../../store/api-actions';
import { getAuthorizationStatus, getUserData } from '../../store/selectors.ts/user-selector';
import { AppRoute, AuthorizationStatus } from '../../utils/constants';
import CitiesList from '../cities-list/cities-list';

function MainEmpty(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  return (
    <div className='page page--gray page--main'>
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <div className='header__left'>
              <Link className='header__logo-link header__logo-link--active' to={AppRoute.MAIN}>
                <img className='header__logo' src='img/logo.svg' alt='6 cities logo' width='81' height='41' />
              </Link>
            </div>
            <nav className='header__nav'>
              <ul className='header__nav-list'>
                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <>
                    <li className='header__nav-item user'>
                      <Link className='header__nav-link header__nav-link--profile' to={AppRoute.FAVORITES}>
                        <div className='header__avatar-wrapper user__avatar-wrapper'></div>
                        <span className='header__user-name user__name'>{userData.email}</span>
                      </Link>
                    </li>
                    <li className='header__nav-item'>
                      <Link onClick={() => dispatch(logoutFromCite())} className='header__nav-link' to={AppRoute.LOGIN}>
                        <span className='header__signout'>Sign out</span>
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className='header__nav-item user'>
                    <Link className='header__nav-link header__nav-link--profile' to={AppRoute.LOGIN}>
                      <div className='header__avatar-wrapper user__avatar-wrapper'></div>
                      <span className='header__login'>Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className='page__main page__main--index page__main--index-empty'>
        <h1 className='visually-hidden'>Cities</h1>
        <CitiesList />
        <div className='cities'>
          <div className='cities__places-container cities__places-container--empty container'>
            <section className='cities__no-places'>
              <div className='cities__status-wrapper tabs__content'>
                <b className='cities__status'>No places to stay available</b>
                <p className='cities__status-description'>We could not find any property available at the moment in Dusseldorf</p>
              </div>
            </section>
            <div className='cities__right-section'></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainEmpty;
