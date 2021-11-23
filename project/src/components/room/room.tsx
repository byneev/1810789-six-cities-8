/* eslint-disable no-console */
import { MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { OfferProp } from '../../types/offer';
import { changeOffers, setActiveOffer } from '../../store/actions';
import { addToFavorites } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/selectors.ts/user-selector';
import { AppRoute, AuthorizationStatus, Container } from '../../utils/constants';

export type RoomProp = {
  container: string;
  room: OfferProp;
};

function Room(prop: RoomProp): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const dispatch = useDispatch();
  const { container, room } = prop;
  const [currentStatus, setCurrentStatus] = useState(Number(room.isFavorite));
  const starsCount = room.rating * 20;
  return (
    <article className={container === Container.FAVORITES ? 'favorites__card place-card' : 'cities__place-card place-card'}>
      {room.isPremium ? (
        <div className='place-card__mark'>
          <span>Premium</span>
        </div>
      ) : (
        ''
      )}
      <div className={container === Container.FAVORITES ? 'favorites__image-wrapper place-card__image-wrapper' : 'cities__image-wrapper place-card__image-wrapper'}>
        <Link to={`${AppRoute.ROOM}${room.id}`}>
          <img onMouseEnter={() => dispatch(setActiveOffer(room.id))} onMouseOut={() => dispatch(setActiveOffer(null))} className='place-card__image' src={room.previewImage} width={container === Container.FAVORITES ? '150' : '260'} height={container === Container.FAVORITES ? '110' : '200'} alt={room.title} />
        </Link>
      </div>
      <div className={container === Container.FAVORITES ? 'favorites__card-info place-card__info' : 'place-card__info'}>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>&euro;{room.price}</b>
            <span className='place-card__price-text'>&#47;&nbsp;night</span>
          </div>
          {authorizationStatus === AuthorizationStatus.Auth ? (
            <button
              onClick={(evt: MouseEvent<HTMLButtonElement>) => {
                evt.preventDefault();
                dispatch(addToFavorites(room.id, Number(Boolean(!currentStatus))));
                dispatch(changeOffers({ ...room, isFavorite: Boolean(!currentStatus) }));
                setCurrentStatus(Number(Boolean(!currentStatus)));
              }}
              className={currentStatus ? 'place-card__bookmark-button button place-card__bookmark-button--active' : 'place-card__bookmark-button button'}
              type='button'
            >
              <svg className='place-card__bookmark-icon' width='18' height='19'>
                <use xlinkHref='#icon-bookmark'></use>
              </svg>
              <span className='visually-hidden'>To bookmarks</span>
            </button>
          ) : (
            ''
          )}
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{ width: `${starsCount}%` }}></span>
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
