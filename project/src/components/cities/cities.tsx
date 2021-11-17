/* eslint-disable no-console */
import { Container } from '../../utils/constants';
import Map from '../map/map';
import OffersList from '../offersList/offers-list';
import { StateProps } from '../../store/reducer';
import { connect, ConnectedProps } from 'react-redux';
import Sort from '../sort/sort';

const mapStateToProps = ({currentCity, offers}:StateProps) => ({
  currentCity,
  offers,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Cities(props: PropsFromRedux):JSX.Element {
  const {currentCity, offers} = props;
  return (
    <div className='cities'>
      <div className='cities__places-container container'>
        <section className='cities__places places'>
          <h2 className='visually-hidden'>Places</h2>
          <b className='places__found'>{`${offers.length} places to stay in ${currentCity}`}</b>
          <Sort />
          <div className='cities__places-list places__list tabs__content'>
            <OffersList container={Container.MAIN} offers={offers}  />
          </div>
        </section>
        <div className='cities__right-section'>
          {offers.length !== 0
            ? <Map styleClassName={'cities'}  />
            : ''}
        </div>
      </div>
    </div>
  );
}

export default connector(Cities);
export {Cities};
