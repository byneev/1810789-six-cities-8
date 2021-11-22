import { useSelector } from 'react-redux';
import { ReviewProp } from '../../types/review';
import { getCurrentComments } from '../../store/selectors.ts/user-selector';
import Review from '../review/review';
import { sortReviewsByData } from '../../utils/functions';

function ReviewsList(): JSX.Element {
  const currentComments = useSelector(getCurrentComments);
  const comments = sortReviewsByData(currentComments);
  return (
    <ul className='reviews__list'>
      {comments.slice(0, 10).map((review: ReviewProp) => (
        <Review key={review.id} review={review} />
      ))}
    </ul>
  );
}

export default ReviewsList;
