/* eslint-disable no-console */
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { OfferProp } from '../../mock/offer';
import { loadCurrentOffer, ThunkAppDispatch } from '../../store/api-actions';
import { AppRoute, Container } from '../../utils/constants';

export type RoomProp =  {
  container: string;
  room: OfferProp;
  mouseEnterHandler: (offerId: number) => void;
  removeActiveStates: () => void;
}

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onRoomClick(id:number){
    dispatch(loadCurrentOffer(id));
  },
});
const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedRoomProps = RoomProp & PropsFromRedux;

function Room(prop: ConnectedRoomProps): JSX.Element {
  const {container, room, mouseEnterHandler, removeActiveStates} = prop;

  return (
    <article className={container === Container.FAVORITES ? 'favorites__card place-card' : 'cities__place-card place-card'}>
      {room.isPremium ?
        <div className='place-card__mark'>
          <span>Premium</span>
        </div> : ''}
      <div className={container === Container.FAVORITES ? 'favorites__image-wrapper place-card__image-wrapper' : 'cities__image-wrapper place-card__image-wrapper'}>
        <Link to={`${AppRoute.ROOM}${room.id}`}>
          <img onMouseEnter={() => mouseEnterHandler(room.id)} onMouseOut={() => removeActiveStates()} className='place-card__image' src={room.previewImage} width='260' height='200' alt={room.title} />
        </Link>
      </div>
      <div className={ container === Container.FAVORITES ? 'favorites__card place-card__info' : 'place-card__info'} >
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{room.price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          <button className='place-card__bookmark-button button' type='button'>
            <svg className='place-card__bookmark-icon' width='18' height='19'>
              <use xlinkHref='#icon-bookmark'></use>
            </svg>
            <span className='visually-hidden'>To bookmarks</span>
          </button>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{ width: '80%' }}></span>
            <span className='visually-hidden'>{room.rating}</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <a href='/'>{room.title}</a>
        </h2>
        <p className='place-card__type'>{room.type}</p>
      </div>
    </article>
  );
}

export {Room};
export default connector(Room);
