/* eslint-disable no-console */
import { Map, TileLayer } from 'leaflet';
import { MutableRefObject, useEffect, useState } from 'react';
import { OfferProp } from '../../mock/offer';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, offer: OfferProp, currentOffer: OfferProp | null ) : Map | null {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (map !== null) {
      map.remove();
      console.log(map);
    }
    setMap(null);
  }, [currentOffer]);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      console.log('I am rdy to create map');
      const instance = new Map(mapRef.current,
        {
          center: currentOffer === null ?
            [offer.city.location.latitude, offer.city.location.longitude] :
            [currentOffer.city.location.latitude, currentOffer.city.location.longitude],
          zoom: currentOffer === null ?
            offer.city.location.zoom :
            currentOffer.city.location.zoom,
        },
      );
      const layer = new TileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );

      instance.addLayer(layer);
      setMap(instance);
    }}, [map, mapRef, offer]);

  return map;
}

export default useMap;
