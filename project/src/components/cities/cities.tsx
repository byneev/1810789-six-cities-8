import { Container } from '../../utils/constants';
import Map from '../map/map';
import OffersList from '../offersList/offers-list';
import { useSelector } from 'react-redux';
import Sort from '../sort/sort';
import { getCurrentCity, getOffersSelectorByCity } from '../../store/selectors.ts/app-selector';

function Cities(): JSX.Element {
  const currentCity = useSelector(getCurrentCity);
  const offersSelector = getOffersSelectorByCity(currentCity);
  const currentOffers = useSelector(offersSelector);

  if (currentOffers.length === 0) {
    return (
      <div className='cities'>
        <div className='cities__places-container cities__places-container--empty container'>
          <section className='cities__no-places'>
            <div className='cities__status-wrapper tabs__content'>
              <b className='cities__status'>No places to stay available</b>
              <p className='cities__status-description'>We could not find any property available at the moment in {currentCity}</p>
            </div>
          </section>
          <div className='cities__right-section'></div>
        </div>
      </div>
    );
  }
  return (
    <div className='cities'>
      <div className='cities__places-container container'>
        <section className='cities__places places'>
          <h2 className='visually-hidden'>Places</h2>
          <b className='places__found'>{`${currentOffers.length} places to stay in ${currentCity}`}</b>
          <Sort />
          <div className='cities__places-list places__list tabs__content'>
            <OffersList container={Container.MAIN} offers={currentOffers} />
          </div>
        </section>
        <div className='cities__right-section'>{currentOffers.length !== 0 ? <Map styleClassName={'cities'} /> : ''}</div>
      </div>
    </div>
  );
}

export default Cities;
