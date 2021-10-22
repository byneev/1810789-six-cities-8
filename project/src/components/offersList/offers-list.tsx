/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { OfferProps } from '../app/app';
import Room from '../room/room';

export type OffersListProps = OfferProps & {
  container: string;
  mouseEnterHandler: (offerId: number) => void;
  removeActiveStates: () => void;
}

function OffersList(props: OffersListProps): JSX.Element {
  const {container, offers, mouseEnterHandler, removeActiveStates} = props;
  return(
    <React.Fragment>
      {offers.map((offer) =>
        <Room key={`${offer.id}-${offer.city.name}`} container={container} room={offer} mouseEnterHandler={mouseEnterHandler} removeActiveStates={removeActiveStates} />)}
    </React.Fragment>
  );
}

export default OffersList;
