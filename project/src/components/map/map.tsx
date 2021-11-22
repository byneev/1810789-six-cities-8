/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import { Icon, Marker} from 'leaflet';
import { useEffect, useRef} from 'react';
import useMap from '../../hooks/useMap/useMap';
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import useLayer from '../../hooks/useLayer/useLayer';
import { OfferProp } from '../../types/offer';
import { getCurrentOffer, getNearbyOffers, getOffers } from '../../store/selectors.ts/app-selector';
import { getActiveOfferId } from '../../store/selectors.ts/user-selector';

export type MapProps = {
  styleClassName: string;
}

const inactiveMarker = new Icon({
  iconUrl:'/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [14, 39],
});

const activeMarker = new Icon({
  iconUrl:'/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [14, 39],
});

function Map(props: MapProps) : JSX.Element {
  const currentOffer = useSelector(getCurrentOffer);
  const activeOfferId = useSelector(getActiveOfferId);
  const offers = useSelector(getOffers);
  const nearbyOffers = useSelector(getNearbyOffers);

  const {styleClassName} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, offers[0], currentOffer);
  const layer = useLayer(map);

  useEffect(() => {
    if (map && offers && layer) {
      map.setView(
        [offers[0].city.location.latitude, offers[0].city.location.longitude],
        offers[0].city.location.zoom);
      offers.forEach((offer) => {
        const marker = new Marker([offer.location.latitude, offer.location.longitude]);
        marker.setIcon(inactiveMarker).addTo(layer);
      });
    }
  }, [layer, offers]);

  useEffect(() => {
    if (layer) {
      layer.clearLayers();
      let currentOffers:OfferProp[] = offers;
      if (styleClassName === 'property') {
        currentOffers = nearbyOffers;
      }
      currentOffers.forEach((offer) => {
        const marker = new Marker([offer.location.latitude, offer.location.longitude]);
        marker.setIcon(activeOfferId !== null && offer.id === activeOfferId ?
          activeMarker :
          inactiveMarker).addTo(layer);
      });
    }
  }, [activeOfferId]);

  useEffect(() => {
    if (map && layer && currentOffer) {
      layer.clearLayers();
      map.setView(
        [currentOffer.location.latitude, currentOffer.location.longitude] ,
        currentOffer.location.zoom - 3,
      );
      nearbyOffers.forEach((offer) => {
        const marker = new Marker([offer.location.latitude, offer.location.longitude]);
        marker.setIcon(activeOfferId !== null && offer.id === activeOfferId ?
          activeMarker :
          inactiveMarker).addTo(layer);
      });
    }
  }, [nearbyOffers]);

  return (
    <section ref={mapRef} className={`${styleClassName}__map map`}></section>
  );
}

export default Map;
