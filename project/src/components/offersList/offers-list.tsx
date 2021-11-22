/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { OfferProp } from '../../types/offer';
import { getCurrentSort } from '../../store/selectors.ts/app-selector';
import { sortBySortType } from '../../utils/functions';
import Room from '../room/room';

export type OffersListProps = {
  offers: OfferProp[];
  container: string;
}

function OffersList(props: OffersListProps): JSX.Element {
  const currentSort = useSelector(getCurrentSort);
  const {container, offers } = props;
  const sortedOffers:OfferProp[] = sortBySortType(offers, currentSort);
  return(
    <React.Fragment>
      {sortedOffers.map((offer) =>
        <Room key={`${offer.id}-${offer.city.name}`} container={container} room={offer} />)}
    </React.Fragment>
  );
}

export default OffersList;
