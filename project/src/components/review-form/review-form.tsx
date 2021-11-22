/* eslint-disable no-console */
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { changeRating } from '../../store/actions';
import { sendComment } from '../../store/api-actions';
import { getCurrentRating, getIsFormDisabled } from '../../store/selectors.ts/user-selector';

export type CommentData = {
  comment: string;
  rating: number;
};

export type ReviewFormProps = {
  id: number;
}

const MAX_CHARACTERS_COUNT = 300;
const MIN_CHARACTERS_COUNT = 50;

function ReviewForm(props: ReviewFormProps):JSX.Element {
  const currentRating = useSelector(getCurrentRating);
  const isFormDisabled = useSelector(getIsFormDisabled);
  const dispatch = useDispatch();
  const {id} = props;
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const [isSubmitActive, setIsSubmitActive] = useState(false);
  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={(evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      if (textarea.current !== null) {
        dispatch(sendComment(id, {
          comment: textarea.current.value,
          rating: currentRating,
        }));
        setIsSubmitActive(false);
        textarea.current.value = '';
      }
    } }
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">

        <input disabled={isFormDisabled} onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          dispatch(changeRating(+evt.target.value));
        } } className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" checked={currentRating === 5}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input disabled={isFormDisabled} onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          dispatch(changeRating(+evt.target.value));
        } } className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" checked={currentRating === 4}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input disabled={isFormDisabled} onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          dispatch(changeRating(+evt.target.value));
        } } className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" defaultChecked={currentRating === 3}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input disabled={isFormDisabled} onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          dispatch(changeRating(+evt.target.value));
        } } className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" checked={currentRating === 2}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input disabled={isFormDisabled} onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          dispatch(changeRating(+evt.target.value));
        } } className="form__rating-input visually-hidden" name="rating" value="1" id="1-stars" type="radio" checked={currentRating === 1}
        />
        <label htmlFor="1-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea disabled={isFormDisabled} onChange={() => {
        if (textarea.current !== null && textarea.current.value.length <= MAX_CHARACTERS_COUNT && textarea.current.value.length >= MIN_CHARACTERS_COUNT) {
          setIsSubmitActive(true);
        }
      }} ref={textarea} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.</p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isSubmitActive}>Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
