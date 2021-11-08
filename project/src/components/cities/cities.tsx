import { useState } from 'react';
import { Container } from '../../utils/constants';
import Map from '../map/map';
import OffersList from '../offersList/offers-list';
import { StateProps } from '../../store/reducer';
import { connect, ConnectedProps } from 'react-redux';
import { getOffersByCity } from '../../utils/functions';
import Sort from '../sort/sort';
import { OfferProp } from '../../mock/offer';

const mapStateToProps = ({currentCity, offers}:StateProps) => ({
  currentCity,
  offers,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Cities(props: PropsFromRedux):JSX.Element {
  const {currentCity, offers} = props;
  const currentOffers = getOffersByCity(offers, currentCity);
  const [currentOffer, setCurrentOffer] = useState<OfferProp | undefined>(undefined);

  const offerMouseEnterHandler = (offerFromList:OfferProp):void => {
    setCurrentOffer(offerFromList);
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
          <Sort />
          <div className='cities__places-list places__list tabs__content'>
            <OffersList removeActiveStates={offerMouseOutHandler} container={Container.MAIN} offers={currentOffers} mouseEnterHandler={offerMouseEnterHandler} />
          </div>
        </section>
        <div className='cities__right-section'>
          {currentOffers.length !== 0
            ? <Map offers={currentOffers} activeOffer={currentOffer} styleClassName={'cities'} city={currentCity} />
            : ''}
        </div>
      </div>
    </div>
  );
}

export default connector(Cities);
export {Cities};
