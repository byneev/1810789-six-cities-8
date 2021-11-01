/* eslint-disable react-hooks/exhaustive-deps */
import { Icon, Marker} from 'leaflet';
import { useEffect, useRef} from 'react';
import useMap from '../../hooks/useMap/useMap';
import type { CitiesProps, OfferProp } from '../../mock/offer';
import 'leaflet/dist/leaflet.css';

export type MapProps = {
  offers: OfferProp[];
  currentOffer: number | undefined;
  styleClassName: string;
  city: CitiesProps;
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
  const {offers, currentOffer, styleClassName, city} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, offers[0]);

  useEffect(() => {
    if (map && offers) {
      offers.forEach((offer) => {
        const marker = new Marker([offer.location.latitude, offer.location.longitude]);
        marker.setIcon(currentOffer !== undefined && offer.id === currentOffer ?
          activeMarker :
          inactiveMarker).addTo(map);
      });
    }
  }, [map, offers, currentOffer]);

  useEffect(() => {
    if (map && offers) {
      const defaultOffer = offers[0];
      map.flyTo([defaultOffer.location.latitude, defaultOffer.location.longitude], defaultOffer.location.zoom);
    }
  }, [city]);

  return (
    <section ref={mapRef} className={`${styleClassName}__map map`}></section>
  );
}

export default Map;
