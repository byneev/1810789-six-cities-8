/* eslint-disable no-console */
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { OfferProp} from '../../mock/offer';
import { ReviewProp} from '../../mock/review';
import { reviews } from '../../mock/review';
import { AppRoute, Container } from '../../utils/constants';
import OffersList from '../offersList/offers-list';
import { useState } from 'react';
import ReviewForm from '../review-form/review-form';
import ReviewsList from '../reviews-list/reviews-list';
import Map from '../map/map';

export type IdProps = {
  id: string
}

export type RoomPageProps = RouteComponentProps<IdProps> & {
  offers: OfferProp[];
}

function RoomPage(props: RoomPageProps):JSX.Element {
  const {match, offers} = props;
  const id:string = match.params.id;
  const offer = offers[+id - 1];
  const [reviewsList, setReviewsList] = useState(reviews);
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.MAIN}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.MAIN}>
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to={AppRoute.LOGIN}>
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer.images.map((item) => (
                <div key={`${item}-${id}`} className="property__image-wrapper">
                  <img className="property__image" src={item} alt={offer.title} />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {offer.isPremium ?
                <div className="property__mark">
                  <span>Premium</span>
                </div> :
                ''}
              <div className="property__name-wrapper">
                <h1 className="property__name">{offer.title}</h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: '80%'}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">{offer.type}</li>
                <li className="property__feature property__feature--bedrooms">{offer.bedrooms} Bedrooms</li>
                <li className="property__feature property__feature--adults">Max {offer.maxAdults} adults</li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offer.goods.map((item) => (
                    <li key={`${item}-${id}`} className="property__inside-item">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name"> {offer.host.name} </span>
                  {offer.host.isPro ?
                    <span className="property__user-status"> Pro </span> :
                    ''}
                </div>
                <div className="property__description">
                  <p className="property__text">{offer.description}</p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsList.length}</span></h2>
                <ReviewsList reviews={reviewsList} />
                <ReviewForm onSubmitCallback={(reviewData:ReviewProp) =>
                  setReviewsList([...reviewsList, reviewData])}
                />
              </section>
            </div>
          </div>
          <Map offers={offers.slice(0, 3)} currentOffer={undefined} styleClassName={'property'} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <OffersList container={Container.ROOM} offers={offers.filter((item) => item.city.name === offer.city.name).slice(0, 3)} mouseEnterHandler={(item) => null} removeActiveStates={() => null}/>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default RoomPage;
