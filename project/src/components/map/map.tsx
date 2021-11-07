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
  currentOffer: OfferProp | undefined;
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

const mapStateToProps = ({isNeedRefreshMarkers}:StateProps) => ({
  isNeedRefreshMarkers,
});
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedMapProps = PropsFromRedux & MapProps;

function Map(props: ConnectedMapProps) : JSX.Element {
  const {offers, currentOffer, styleClassName, isNeedRefreshMarkers} = props;
  const mapRef = useRef(null);
  const layer = useMap(mapRef, offers[0], isNeedRefreshMarkers);
  console.log(isNeedRefreshMarkers);
  if (isNeedRefreshMarkers) {
    layer?.clearLayers();
  }

  useEffect(() => {
    if (layer && offers) {
      offers.forEach((offer) => {
        const marker = new Marker([offer.location.latitude, offer.location.longitude]);
        marker.setIcon(currentOffer !== undefined && offer.id === currentOffer.id ?
          activeMarker :
          inactiveMarker).addTo(layer);
      });
      if (currentOffer !== undefined) {
        new Marker([currentOffer.location.latitude, currentOffer.location.longitude]).setIcon(activeMarker).addTo(layer);
      }
    }
  }, [layer, currentOffer, offers]);

  // useEffect(() => {
  //   if (layer && offers) {
  //     const defaultOffer = offers[0];
  //     layer.flyTo([defaultOffer.city.location.latitude, defaultOffer.city.location.longitude], defaultOffer.city.location.zoom);
  //   }
  // }, [city]);

  return (
    <section ref={mapRef} className={`${styleClassName}__map map`}></section>
  );
}

export {Map};
export default connector(Map);
