import { ReviewProp } from '../../mock/review';
import Review from '../review/review';

export type ReviewListProps = {
  reviews: ReviewProp[];
}

function ReviewsList(props: ReviewListProps): JSX.Element {
  const {reviews} = props;
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </ul>
  );
}

export default ReviewsList;
