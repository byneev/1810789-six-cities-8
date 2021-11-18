import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCity} from '../../store/actions';
import { City, SortType } from '../../utils/constants';
import { loadOffersFromServer} from '../../store/api-actions';
import { getCurrentCity } from '../../store/selectors.ts/app-selector';

function CitiesList():JSX.Element {
  const currentCity = useSelector(getCurrentCity);
  const dispatch = useDispatch();

  return (
    <div className='tabs'>
      <section className='locations container'>
        <ul className='locations__list tabs__list'>
          <li className='locations__item'>
            <a onClick={(evt:MouseEvent<HTMLAnchorElement>) => {
              evt.preventDefault();
              dispatch(changeCity(City.PARIS, SortType.Popular));
              dispatch(loadOffersFromServer());
            }} className={currentCity === City.PARIS
              ? 'locations__item-link tabs__item tabs__item--active'
              : 'locations__item-link tabs__item'} href='/'
            >
              <span>Paris</span>
            </a>
          </li>
          <li className='locations__item'>
            <a onClick={(evt:MouseEvent<HTMLAnchorElement>) => {
              evt.preventDefault();
              dispatch(changeCity(City.COLOGNE, SortType.Popular));
              dispatch(loadOffersFromServer());
            }} className={currentCity === City.COLOGNE
              ? 'locations__item-link tabs__item tabs__item--active'
              : 'locations__item-link tabs__item'} href='/'
            >
              <span>Cologne</span>
            </a>
          </li>
          <li className='locations__item'>
            <a onClick={(evt:MouseEvent<HTMLAnchorElement>) => {
              evt.preventDefault();
              dispatch(changeCity(City.BRUSSELS, SortType.Popular));
              dispatch(loadOffersFromServer());
            }} className={currentCity === City.BRUSSELS
              ? 'locations__item-link tabs__item tabs__item--active'
              : 'locations__item-link tabs__item'} href='/'
            >
              <span>Brussels</span>
            </a>
          </li>
          <li className='locations__item'>
            <a onClick={(evt:MouseEvent<HTMLAnchorElement>) => {
              evt.preventDefault();
              dispatch(changeCity(City.AMSTERDAM, SortType.Popular));
              dispatch(loadOffersFromServer());
            }} className={currentCity === City.AMSTERDAM
              ? 'locations__item-link tabs__item tabs__item--active'
              : 'locations__item-link tabs__item'} href='/'
            >
              <span>Amsterdam</span>
            </a>
          </li>
          <li className='locations__item'>
            <a onClick={(evt:MouseEvent<HTMLAnchorElement>) => {
              evt.preventDefault();
              dispatch(changeCity(City.HAMBURG, SortType.Popular));
              dispatch(loadOffersFromServer());
            }} className={currentCity === City.HAMBURG
              ? 'locations__item-link tabs__item tabs__item--active'
              : 'locations__item-link tabs__item'} href='/'
            >
              <span>Hamburg</span>
            </a>
          </li>
          <li className='locations__item'>
            <a onClick={(evt:MouseEvent<HTMLAnchorElement>) => {
              evt.preventDefault();
              dispatch(changeCity(City.DUSSELDORF, SortType.Popular));
              dispatch(loadOffersFromServer());
            }} className={currentCity === City.DUSSELDORF
              ? 'locations__item-link tabs__item tabs__item--active'
              : 'locations__item-link tabs__item'} href='/'
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
