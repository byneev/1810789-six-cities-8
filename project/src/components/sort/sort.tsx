import { useDispatch, useSelector} from 'react-redux';
import {  changeSort } from '../../store/actions';
import { getCurrentSort } from '../../store/selectors.ts/app-selector';
import { SortType } from '../../utils/constants';

function Sort():JSX.Element {
  const currentSort = useSelector(getCurrentSort);
  const dispatch = useDispatch();
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
            dispatch(changeSort(SortType.Popular));
          }
        } className={currentSort === SortType.Popular ? 'places__option places__option--active' : 'places__option'} tabIndex={0}
        >
      Popular
        </li>
        <li onClick={
          () => {
            dispatch(changeSort(SortType.LowFirst));
          }
        } className={currentSort === SortType.LowFirst ? 'places__option places__option--active' : 'places__option'} tabIndex={0}
        >
      Price: low to high
        </li>
        <li onClick={
          () => {
            dispatch(changeSort(SortType.HighFirst));
          }
        } className={currentSort === SortType.HighFirst ? 'places__option places__option--active' : 'places__option'} tabIndex={0}
        >
      Price: high to low
        </li>
        <li onClick={
          () => {
            dispatch(changeSort(SortType.RatedFirst));
          }
        } className={currentSort === SortType.RatedFirst ? 'places__option places__option--active' : 'places__option'} tabIndex={0}
        >
      Top rated first
        </li>
      </ul>
    </form>
  );
}

export default Sort;
