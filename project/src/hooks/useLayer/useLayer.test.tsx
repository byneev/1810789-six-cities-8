import { renderHook } from '@testing-library/react-hooks';
import { LayerGroup, Map } from 'leaflet';
import useLayer from './useLayer';

describe('Test useLayerhook', () => {
  it('Should return LayerGroup', () => {
    const elem = document.createElement('div');
    const instance = new Map(elem, {
      center: [10, 10],
      zoom: 10,
    });
    const { result } = renderHook(() => useLayer(instance));
    const layer = result.current;
    expect(layer).toBeInstanceOf(LayerGroup || null);
  });
});
