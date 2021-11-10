import { connect, ConnectedProps } from 'react-redux';
import { ReviewProp } from '../../mock/review';
import { StateProps } from '../../store/reducer';
import Review from '../review/review';

const mapStateToProps = ({currentComments}:StateProps) => ({
  currentComments,
});


const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function ReviewsList(props: PropsFromRedux): JSX.Element {
  const {currentComments} = props;
  return (
    <ul className="reviews__list">
      {currentComments.map((review:ReviewProp) => (
        <Review key={review.id} review={review} />
      ))}
    </ul>
  );
}

export default connector(ReviewsList);
export {ReviewsList};
