/* eslint-disable no-console */
import { OfferProp } from '../../mock/offer';
import { Container } from '../../utils/constants';

export type RoomProp =  {
  room: OfferProp;
  container: string;
}

function Room(prop: RoomProp): JSX.Element {
  const {container, room} = prop;
  return (
    <article className={container === Container.FAVORITES ? 'favorites__card place-card' : 'cities__place-card place-card'}>
      {room.isPremium ?
        <div className='place-card__mark'>
          <span>Premium</span>
        </div> : ''}
      <div className={container === Container.FAVORITES ? 'favorites__image-wrapper place-card__image-wrapper' : 'cities__image-wrapper place-card__image-wrapper'}>
        <a href='/'>
          <img className='place-card__image' src={room.previewImage} width='260' height='200' alt={room.title} />
        </a>
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

export default Room;
