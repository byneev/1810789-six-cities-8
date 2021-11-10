import { OfferProp } from '../../mock/offer';
import { Container } from '../../utils/constants';
import OffersList from '../offersList/offers-list';

export type LocationItemProps = {
  offers: OfferProp[];
  city: string;
}

function LocationItem(props:LocationItemProps):JSX.Element {
  const { offers, city } = props;
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="/">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        <OffersList container={Container.FAVORITES} offers={offers} mouseEnterHandler={function (offerId: OfferProp): void {
          throw new Error('Function not implemented.');
        } } removeActiveStates={function (): void {
          throw new Error('Function not implemented.');
        } }
        />
      </div>
    </li>
  );
}

export default LocationItem;
