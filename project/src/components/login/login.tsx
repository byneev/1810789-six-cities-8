import { FormEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, RouteProps } from 'react-router-dom';
import { AppRoute, City, SortType } from '../../utils/constants';
import { loadOffersFromServer, loginToCite } from '../../store/api-actions';
import { getCurrentCity } from '../../store/selectors.ts/app-selector';
import { changeCity } from '../../store/actions';
import { toast } from 'react-toastify';

export type AuthData = {
  login: string;
  password: string;
};

export type LoginProps = RouteProps & {
  onSubmitData: () => void;
};

function Login(props: LoginProps): JSX.Element {
  const currentCity = useSelector(getCurrentCity);
  const dispatch = useDispatch();

  const { onSubmitData } = props;
  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  return (
    <div className='page page--gray page--login'>
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <div className='header__left'>
              <Link
                onClick={() => {
                  dispatch(changeCity(City.PARIS, SortType.Popular));
                  dispatch(loadOffersFromServer());
                }}
                className='header__logo-link'
                to={AppRoute.MAIN}
              >
                <img className='header__logo' src='img/logo.svg' alt='6 cities logo' width='81' height='41' />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className='page__main page__main--login'>
        <div className='page__login-container container'>
          <section className='login'>
            <h1 className='login__title'>Sign in</h1>
            <form
              onSubmit={(evt: FormEvent<HTMLFormElement>) => {
                evt.preventDefault();
                if (email.current && password.current) {
                  if (!password.current.value.match('(?=.*?[a-zA-Z])(?=.*?[0-9])')) {
                    toast.error('Password should contain at least one letter and one digit');
                  } else {
                    dispatch(changeCity(City.PARIS, SortType.Popular));
                    dispatch(loadOffersFromServer());
                    dispatch(
                      loginToCite({
                        login: email.current.value,
                        password: password.current.value,
                      }),
                    );
                    onSubmitData();
                  }
                }
              }}
              className='login__form form'
              action='#'
              method='post'
            >
              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden'>E-mail</label>
                <input ref={email} className='login__input form__input' type='email' name='email' placeholder='Email' required />
              </div>
              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden'>Password</label>
                <input ref={password} className='login__input form__input' type='password' name='password' placeholder='Password' required />
              </div>
              <button className='login__submit form__submit button' type='submit'>
                Sign in
              </button>
            </form>
          </section>
          <section className='locations locations--login locations--current'>
            <div className='locations__item'>
              <a className='locations__item-link' href='/'>
                <span>{currentCity}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
