/* eslint-disable no-console */
import dayjs from 'dayjs';
import { ChangeEvent, FormEvent, useState } from 'react';
import { ReviewProp} from '../../mock/review';

export type ReviewProps = {
  onSubmitCallback: (review: ReviewProp) => void;
}

function ReviewForm(props: ReviewProps):JSX.Element {
  const {onSubmitCallback} = props;
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={(evt:FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      onSubmitCallback({
        comment: comment,
        date: dayjs().toISOString(),
        id: 7,
        rating: rating,
        user: {
          avatarUrl: 'img/9.png',
          id: 15,
          isPro: false,
          name: 'Stanislav',
        },
      });
      setComment('');
      setRating(1);
    }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" checked={rating === 5} />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={(evt:ChangeEvent<HTMLInputElement>) => {
          setRating(+evt.target.value);
        }} className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" checked={rating === 4}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          setRating(+evt.target.value);
        }} className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" checked={rating === 3}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          setRating(+evt.target.value);
        }} className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" checked={rating === 2}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          setRating(+evt.target.value);
        }} className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" checked={rating === 1}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(evt.target.value);
      }} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={comment}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.</p>
        <button className="reviews__submit form__submit button" type="submit" disabled={false}>Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
