import { MouseEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {Dispatch} from 'redux';
import { CitiesProps, OfferProp } from '../../mock/offer';
import { Actions, getChangeCity, getSetCurrentOffers } from '../../store/actions';
import { City } from '../../utils/constants';
import { StateProps } from '../../store/reducer';
import { getOffersByCity } from '../../utils/functions';

const mapStateToProps = ({currentCity, offers}:StateProps ) => ({
  currentCity,
  offers,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onCityChange(offers: OfferProp[], city: CitiesProps) {
    dispatch(getChangeCity(city));
    dispatch(getSetCurrentOffers(getOffersByCity(offers, city)));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function CitiesList(props: PropsFromRedux):JSX.Element {
  const {onCityChange, currentCity, offers} = props;
  return (
    <div className='tabs'>
      <section className='locations container'>
        <ul className='locations__list tabs__list'>
          <li className='locations__item'>
            <a onClick={(evt:MouseEvent<HTMLAnchorElement>) => {
              evt.preventDefault();
              onCityChange(offers, City.PARIS);
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
              onCityChange(offers, City.COLOGNE);

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
              onCityChange(offers, City.BRUSSELS);
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
              onCityChange(offers, City.AMSTERDAM);
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
              onCityChange(offers, City.HAMBURG);
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
              onCityChange(offers, City.DUSSELDORF);
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

export default connector(CitiesList);
export {CitiesList};
