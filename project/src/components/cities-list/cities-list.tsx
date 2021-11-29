import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCity } from '../../store/actions';
import { City, SortType } from '../../utils/constants';
import { getCurrentCity } from '../../store/selectors.ts/app-selector';
import { CitiesProps } from '../../types/offer';

export type EventFunctionProps = (evt: MouseEvent<HTMLAnchorElement>) => void;

function CitiesList(): JSX.Element {
  const currentCity = useSelector(getCurrentCity);
  const dispatch = useDispatch();

  const cityListCLickHandle = (city: CitiesProps):EventFunctionProps =>
    (evt) => {
      evt.preventDefault();
      dispatch(changeCity(city, SortType.Popular));
    };

  return (
    <div className='tabs'>
      <section className='locations container'>
        <ul className='locations__list tabs__list'>
          <li className='locations__item'>
            <a
              onClick={cityListCLickHandle(City.PARIS)}
              className={currentCity === City.PARIS ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'}
              href='/' data-testid='Paris'
            >
              <span>Paris</span>
            </a>
          </li>
          <li className='locations__item'>
            <a
              onClick={cityListCLickHandle(City.COLOGNE)}
              className={currentCity === City.COLOGNE ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'}
              href='/' data-testid='Cologne'
            >
              <span>Cologne</span>
            </a>
          </li>
          <li className='locations__item'>
            <a
              onClick={cityListCLickHandle(City.BRUSSELS)}
              className={currentCity === City.BRUSSELS ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'}
              href='/' data-testid='Brussels'
            >
              <span>Brussels</span>
            </a>
          </li>
          <li className='locations__item'>
            <a
              onClick={cityListCLickHandle(City.AMSTERDAM)}
              className={currentCity === City.AMSTERDAM ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'}
              href='/'
            >
              <span>Amsterdam</span>
            </a>
          </li>
          <li className='locations__item'>
            <a
              onClick={cityListCLickHandle(City.HAMBURG)}
              className={currentCity === City.HAMBURG ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'}
              href='/'
            >
              <span>Hamburg</span>
            </a>
          </li>
          <li className='locations__item'>
            <a
              onClick={cityListCLickHandle(City.DUSSELDORF)}
              className={currentCity === City.DUSSELDORF ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'}
              href='/'
            >
              <span>Dusseldorf</span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default CitiesList;
