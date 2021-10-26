import { Icon, Marker} from 'leaflet';
import { useEffect, useRef} from 'react';
import useMap from '../../hooks/useMap/useMap';
import type { OfferProp } from '../../mock/offer';
import 'leaflet/dist/leaflet.css';

export type MapProps = {
  offers: OfferProp[];
  currentOffer: number | undefined;
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
  const {offers, currentOffer, styleClassName} = props;
  const mapRef = useRef(null);
  const city = offers[0].city;
  const map = useMap(mapRef, city);

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

  return (
    <section ref={mapRef} className={`${styleClassName}__map map`}></section>
  );
}

export default Map;
