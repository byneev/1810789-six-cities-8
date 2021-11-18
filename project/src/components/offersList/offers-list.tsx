/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { OfferProp } from '../../mock/offer';
import { RootStateProps } from '../../store/reducers/root-reducer';
import { sortBySortType } from '../../utils/functions';
import Room from '../room/room';

export type OffersListProps = {
  offers: OfferProp[];
  container: string;
}

export enum SortType {
  HighFirst = 'Price: high to low',
  LowFirst = 'Price: low to high',
  RatedFirst = 'Top rated first',
  Popular = 'Popular',
}

export type SortProps = | SortType.HighFirst | SortType.LowFirst | SortType.Popular | SortType.RatedFirst;

const mapStateToProps = ({WebApp}:RootStateProps) => ({
  currentSort: WebApp.currentSort,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedOffersListProps = PropsFromRedux & OffersListProps;

function OffersList(props: ConnectedOffersListProps): JSX.Element {
  const {container, offers, currentSort} = props;
  const sortedOffers:OfferProp[] = sortBySortType(offers, currentSort);
  return(
    <React.Fragment>
      {sortedOffers.map((offer) =>
        <Room key={`${offer.id}-${offer.city.name}`} container={container} room={offer} />)}
    </React.Fragment>
  );
}

export {OffersList};
export default connector(OffersList);
