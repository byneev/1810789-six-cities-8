/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import { Icon, Marker} from 'leaflet';
import { useEffect, useRef} from 'react';
import useMap from '../../hooks/useMap/useMap';
import type {  OfferProp } from '../../mock/offer';
import 'leaflet/dist/leaflet.css';
import { connect, ConnectedProps } from 'react-redux';
import { StateProps } from '../../store/reducer';
import useLayer from '../../hooks/useLayer/useLayer';

export type MapProps = {
  offers: OfferProp[];
  activeOffer: OfferProp | undefined;
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

const mapStateToProps = ({currentOffer, currentCity}:StateProps) => ({
  currentOffer,
  currentCity,
});
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedMapProps = PropsFromRedux & MapProps;

function Map(props: ConnectedMapProps) : JSX.Element {
  const {offers, activeOffer, currentOffer, styleClassName, currentCity} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, offers[0], currentOffer);
  const layer = useLayer(map);

  useEffect(() => {
    if (map && offers && layer) {
      map.flyTo(
        [offers[0].city.location.latitude, offers[0].city.location.longitude] ,
        offers[0].city.location.zoom,
        {duration: 1.5});
      if (currentOffer) {
        layer.clearLayers();
        new Marker([currentOffer.location.latitude, currentOffer.location.longitude]).setIcon(activeMarker).addTo(layer);
        map.setView(
          [currentOffer.location.latitude, currentOffer.location.longitude] ,
          currentOffer.location.zoom - 2,
        );
      }
      offers.forEach((offer) => {
        const marker = new Marker([offer.location.latitude, offer.location.longitude]);
        marker.setIcon(activeOffer !== undefined && offer.id === activeOffer.id ?
          activeMarker :
          inactiveMarker).addTo(layer);
      });
    }
  }, [layer, activeOffer, offers, currentOffer, currentCity]);

  return (
    <section ref={mapRef} className={`${styleClassName}__map map`}></section>
  );
}

export {Map};
export default connector(Map);
