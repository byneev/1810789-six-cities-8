import { useState } from 'react';
import { City, Container } from '../../utils/constants';
import { AppProps } from '../app/app';
import Map from '../map/map';
import OffersList from '../offersList/offers-list';


function Cities(props: AppProps):JSX.Element {
  const {offers} = props;
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
          <b className='places__found'>{[...offers].filter((item) => item.city.name === City.AMSTERDAM).length} places to stay in Amsterdam</b>
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
            <OffersList removeActiveStates={offerMouseOutHandler} container={Container.MAIN} offers={offers} mouseEnterHandler={offerMouseEnterHandler} />
          </div>
        </section>
        <div className='cities__right-section'>
          <Map offers={[...offers].filter((item) => item.city.name === City.AMSTERDAM)} currentOffer={currentOffer} />
        </div>
      </div>
    </div>
  );
}

export default Cities;
