/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import { Icon, Marker} from 'leaflet';
import { useEffect, useRef} from 'react';
import useMap from '../../hooks/useMap/useMap';
import type { CitiesProps, OfferProp } from '../../mock/offer';
import 'leaflet/dist/leaflet.css';
import { connect, ConnectedProps } from 'react-redux';
import { StateProps } from '../../store/reducer';

export type MapProps = {
  offers: OfferProp[];
  activeOffer: OfferProp | undefined;
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

const mapStateToProps = ({currentOffer}:StateProps) => ({
  currentOffer,
});
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedMapProps = PropsFromRedux & MapProps;

function Map(props: ConnectedMapProps) : JSX.Element {
  const {offers, activeOffer, currentOffer, styleClassName, city} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, offers[0], currentOffer);

  useEffect(() => {
    if (map && offers) {
      offers.forEach((offer) => {
        const marker = new Marker([offer.location.latitude, offer.location.longitude]);
        marker.setIcon(activeOffer !== undefined && offer.id === activeOffer.id ?
          activeMarker :
          inactiveMarker).addTo(map);
      });
      if (currentOffer !== null) {
        new Marker([currentOffer.location.latitude, currentOffer.location.longitude]).setIcon(activeMarker).addTo(map);
      }
    }
  }, [map, activeOffer, offers]);

  useEffect(() => {
    if (map && offers) {
      const defaultOffer = offers[0];
      map.flyTo([defaultOffer.city.location.latitude, defaultOffer.city.location.longitude], defaultOffer.city.location.zoom);
    }
  }, [city]);

  return (
    <section ref={mapRef} className={`${styleClassName}__map map`}></section>
  );
}

export {Map};
export default connector(Map);
