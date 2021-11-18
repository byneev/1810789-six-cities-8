import { connect, ConnectedProps } from 'react-redux';
import {Dispatch} from 'redux';
import { Actions, getChangeSort } from '../../store/actions';
import { SortProps, SortType } from '../offersList/offers-list';
import { RootStateProps } from '../../store/reducers/root-reducer';

const mapStateToProps = ({WebApp}: RootStateProps) => ({
  currentSort: WebApp.currentSort,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onSortChange(sort: SortProps) {
    dispatch(getChangeSort(sort));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Sort(props: PropsFromRedux):JSX.Element {
  const {currentSort, onSortChange} = props;
  return (
    <form className='places__sorting' action='#' method='get'>
      <span className='places__sorting-caption'>Sort by</span>
      <span className='places__sorting-type' tabIndex={0}>
        {currentSort}
        <svg className='places__sorting-arrow' width='7' height='4'>
          <use xlinkHref='#icon-arrow-select'></use>
        </svg>
      </span>
      <ul className='places__options places__options--custom places__options--opened'>
        <li onClick={
          () => {
            onSortChange(SortType.Popular);
          }
        } className={currentSort === SortType.Popular ? 'places__option places__option--active' : 'places__option'} tabIndex={0}
        >
      Popular
        </li>
        <li onClick={
          () => {
            onSortChange(SortType.LowFirst);
          }
        } className={currentSort === SortType.LowFirst ? 'places__option places__option--active' : 'places__option'} tabIndex={0}
        >
      Price: low to high
        </li>
        <li onClick={
          () => {
            onSortChange(SortType.HighFirst);
          }
        } className={currentSort === SortType.HighFirst ? 'places__option places__option--active' : 'places__option'} tabIndex={0}
        >
      Price: high to low
        </li>
        <li onClick={
          () => {
            onSortChange(SortType.RatedFirst);
          }
        } className={currentSort === SortType.RatedFirst ? 'places__option places__option--active' : 'places__option'} tabIndex={0}
        >
      Top rated first
        </li>
      </ul>
    </form>
  );
}

export {Sort};
export default connector(Sort);
