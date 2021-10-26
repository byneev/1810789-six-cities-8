/* eslint-disable no-console */
import { Link } from 'react-router-dom';
import { AppRoute } from '../../utils/constants';
import CitiesList from '../cities-list/cities-list';
import Cities from '../cities/cities';

function Main(): JSX.Element {
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
                <li className='header__nav-item user'>
                  <Link className='header__nav-link header__nav-link--profile' to={AppRoute.MAIN}>
                    <div className='header__avatar-wrapper user__avatar-wrapper'></div>
                    <span className='header__user-name user__name'>Oliver.conner@gmail.com</span>
                  </Link>
                </li>
                <li className='header__nav-item'>
                  <Link className='header__nav-link' to={AppRoute.LOGIN}>
                    <span className='header__signout'>Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className='page__main page__main--index'>
        <h1 className='visually-hidden'>Cities</h1>
        <CitiesList />
        <Cities />
      </main>
    </div>);
}

export default Main;
