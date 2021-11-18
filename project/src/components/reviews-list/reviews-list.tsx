import { useSelector } from 'react-redux';
import { ReviewProp } from '../../mock/review';
import { getCurrentComments } from '../../store/selectors.ts/user-selector';
import Review from '../review/review';

function ReviewsList(): JSX.Element {
  const currentComments = useSelector(getCurrentComments);
  return (
    <ul className="reviews__list">
      {currentComments.map((review:ReviewProp) => (
        <Review key={review.id} review={review} />
      ))}
    </ul>
  );
}

export default ReviewsList;
