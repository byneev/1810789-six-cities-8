import { useState } from 'react';
import { Container } from '../../utils/constants';
import Map from '../map/map';
import OffersList from '../offersList/offers-list';
import { StateProps } from '../../store/reducer';
import { connect, ConnectedProps } from 'react-redux';
import { getOffersByCity } from '../../utils/functions';

const mapStateToProps = ({currentCity, offers}:StateProps) => ({
  currentCity,
  offers,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Cities(props: PropsFromRedux):JSX.Element {
  const {currentCity, offers} = props;
  const currentOffers = getOffersByCity(offers, currentCity);
  const [currentOffer, setCurrentOffer] = useState<number | undefined>(undefined);

  const offerMouseEnterHandler = (offerFromListId:number):void => {
    setCurrentOffer(offerFromListId);
  };

  const offerMouseOutHandler = () => {
    setCurrentOffer(undefined);
  };

  return (
    <div className='cities'>
      <div className='cities__places-container container'>
        <section className='cities__places places'>
          <h2 className='visually-hidden'>Places</h2>
          <b className='places__found'>{`${currentOffers.length} places to stay in ${currentCity}`}</b>
          <form className='places__sorting' action='#' method='get'>
            <span className='places__sorting-caption'>Sort by</span>
            <span className='places__sorting-type' tabIndex={0}>
            Popular
              <svg className='places__sorting-arrow' width='7' height='4'>
                <use xlinkHref='#icon-arrow-select'></use>
              </svg>
            </span>
            <ul className='places__options places__options--custom places__options--opened'>
              <li className='places__option places__option--active' tabIndex={0}>
              Popular
              </li>
              <li className='places__option' tabIndex={0}>
              Price: low to high
              </li>
              <li className='places__option' tabIndex={0}>
              Price: high to low
              </li>
              <li className='places__option' tabIndex={0}>
              Top rated first
              </li>
            </ul>
          </form>
          <div className='cities__places-list places__list tabs__content'>
            <OffersList removeActiveStates={offerMouseOutHandler} container={Container.MAIN} offers={currentOffers} mouseEnterHandler={offerMouseEnterHandler} />
          </div>
        </section>
        <div className='cities__right-section'>
          {currentOffers.length !== 0
            ? <Map offers={currentOffers} currentOffer={currentOffer} styleClassName={'cities'} />
            : ''}
        </div>
      </div>
    </div>
  );
}

export default connector(Cities);
export {Cities};
