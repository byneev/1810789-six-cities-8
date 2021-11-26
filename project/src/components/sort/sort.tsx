import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSort } from '../../store/actions';
import { getCurrentSort } from '../../store/selectors.ts/app-selector';
import { DefaultFunctionProps } from '../../utils/api';
import { SortProps, SortType } from '../../utils/constants';

function Sort(): JSX.Element {
  const currentSort = useSelector(getCurrentSort);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const dispatch = useDispatch();

  const sortItemClickHandle = (sort: SortProps):DefaultFunctionProps => () => {
    setIsOpened(false);
    dispatch(changeSort(SortType.Popular));
  };

  return (
    <form className='places__sorting' action='#' method='get'>
      <span className='places__sorting-caption'>Sort by </span>
      <span onClick={() => setIsOpened(!isOpened)} className='places__sorting-type' tabIndex={0}>
        {currentSort}
        <svg className='places__sorting-arrow' width='7' height='4'>
          <use xlinkHref='#icon-arrow-select'></use>
        </svg>
      </span>
      <ul className={isOpened ? 'places__options places__options--custom places__options--opened' : 'places__options places__options--custom'}>
        <li
          onClick={sortItemClickHandle(SortType.Popular)}
          className={currentSort === SortType.Popular ? 'places__option places__option--active' : 'places__option'}
          tabIndex={0}
        >
          Popular
        </li>
        <li
          onClick={sortItemClickHandle(SortType.LowFirst)}
          className={currentSort === SortType.LowFirst ? 'places__option places__option--active' : 'places__option'}
          tabIndex={0}
        >
          Price: low to high
        </li>
        <li
          onClick={sortItemClickHandle(SortType.HighFirst)}
          className={currentSort === SortType.HighFirst ? 'places__option places__option--active' : 'places__option'}
          tabIndex={0}
        >
          Price: high to low
        </li>
        <li
          onClick={sortItemClickHandle(SortType.RatedFirst)}
          className={currentSort === SortType.RatedFirst ? 'places__option places__option--active' : 'places__option'}
          tabIndex={0}
        >
          Top rated first
        </li>
      </ul>
    </form>
  );
}

export default Sort;
