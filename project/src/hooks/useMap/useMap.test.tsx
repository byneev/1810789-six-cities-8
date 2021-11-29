import { renderHook } from '@testing-library/react-hooks';
import { Map } from 'leaflet';
import { mockClientOffers } from '../../components/cities/cities.test';
import useMap from './useMap';

describe('Test useMap hook', () => {
  const elem = document.createElement('div');
  const ref = { current: elem };
  it('Should return Map instance', () => {
    const { result } = renderHook(() => useMap(ref, mockClientOffers[0], mockClientOffers[0]));
    const map = result.current;
    expect(map).toBeInstanceOf(Map || null);
  });
});


