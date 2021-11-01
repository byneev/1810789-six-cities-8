/* eslint-disable no-console */
import { Map, TileLayer } from 'leaflet';
import { MutableRefObject, useEffect, useState } from 'react';
import { OfferProp } from '../../mock/offer';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, offer: OfferProp) : Map | null {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = new Map(mapRef.current,
        {
          center: [offer.location.latitude, offer.location.longitude],
          zoom: offer.location.zoom,
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
