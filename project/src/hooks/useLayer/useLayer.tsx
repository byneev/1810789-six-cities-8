import { LayerGroup, Map } from 'leaflet';
import { useEffect, useState } from 'react';

function useLayer(map: Map | null) : LayerGroup | null {
  const [layer, setLayer] = useState<LayerGroup | null >(null);

  useEffect(() => {
    if (map) {
      const instance = new LayerGroup().addTo(map);
      setLayer(instance);
    }
  }, [map]);

  return layer;
}

export default useLayer;

