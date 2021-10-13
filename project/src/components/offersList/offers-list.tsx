/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { OfferProp } from '../../mock/offer';
import { OfferProps } from '../app/app';
import Room from '../room/room';

export type OffersListProps = OfferProps & {
  container: string;
}

function OffersList(props: OffersListProps): JSX.Element {
  const {container, offers} = props;
  console.log(container);
  const [activeId, setActiveId] = useState();
  return(
    <React.Fragment>
      {offers.map((offer) =>
        <Room key={`${offer.id}-${offer.city.name}`} container={container} room={offer}/>)}
    </React.Fragment>
  );
}

export default OffersList;
