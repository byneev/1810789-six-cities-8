import { useSelector } from 'react-redux';
import { getCurrentCity } from '../../store/selectors.ts/app-selector';
import { OfferProp } from '../../types/offer';
import { Container } from '../../utils/constants';
import OffersList from '../offersList/offers-list';

export type LocationItemProps = {
  offers: OfferProp[];
};

function LocationItem(props: LocationItemProps): JSX.Element {
  const { offers } = props;
  const currentCity = useSelector(getCurrentCity);
  return (
    <li className='favorites__locations-items'>
      <div className={offers[0].city.name === currentCity ?
        'favorites__locations locations' :
        'favorites__locations locations locations--current'}
      >
        <div className='locations__item'>
          <a className='locations__item-link' href='/'>
            <span>{offers[0].city.name}</span>
          </a>
        </div>
      </div>
      <div className='favorites__places'>
        <OffersList container={Container.FAVORITES} offers={offers} />
      </div>
    </li>
  );
}

export default LocationItem;
