import { City, SortType } from '../../utils/constants';
import { changeCity, changeOffers, changeSort, setCurrentOffer, setFavoritesOffers, setNearbyOferrs, setupOffers } from '../actions';
import { appReducer, initialState as defaultState } from './app-reducer';

describe('Test AppReducer', () => {

  it('Unknown action should return initial state', () => {
    expect(appReducer(void 0, {type: 'UNKNOWN ACTION'}))
      .toEqual(defaultState);
  });

  it('Should set payload to field offers', () => {
    const state = Object.assign({}, defaultState);
    const payloadOffers = new Array(3).fill(defaultState.currentOffer);
    expect(appReducer(state, setupOffers(payloadOffers)))
      .toEqual({...state, offers: payloadOffers, isLoading: false});
  });

  it('Should set payload to field nearbyOffers', () => {
    const state = Object.assign({}, defaultState);
    const payloadOffers = new Array(3).fill(defaultState.currentOffer);
    expect(appReducer(state, setNearbyOferrs(payloadOffers)))
      .toEqual({...state, nearbyOffers: payloadOffers});
  });

  it('Should set payload to field favoritesOffers', () => {
    const state = Object.assign({}, defaultState);
    const payloadOffers = new Array(3).fill(defaultState.currentOffer);
    expect(appReducer(state, setFavoritesOffers(payloadOffers)))
      .toEqual({...state, favoritesOffers: payloadOffers});
  });

  it('Should set field currentSort to HighFirst', () => {
    const state = Object.assign({}, defaultState);
    const sort = SortType.HighFirst;
    expect(appReducer(state, changeSort(sort)))
      .toEqual({...state, currentSort: sort});
  });

  it('Should set field currentCity to Brussels and currentSort to Top rated first', () => {
    const state = Object.assign({}, defaultState);
    const city = City.BRUSSELS;
    expect(appReducer(state, changeCity(city, SortType.RatedFirst)))
      .toEqual({...state, currentCity: city, currentSort: SortType.RatedFirst});
  });

  it('Should set field currentOffers to payload offer', () => {
    const state = Object.assign({}, defaultState);
    const payloadOffer = Object.assign({}, defaultState.currentOffer, {
      bedrooms: 0,
    });

    expect(appReducer(state, setCurrentOffer(payloadOffer)))
      .toEqual({...state, currentOffer: payloadOffer});
  });

  it('Should swap offer in field offers to payload offer', () => {
    const state = Object.assign({}, defaultState);
    state.offers = new Array(3).fill(defaultState.currentOffer);
    const payloadOffer = {...defaultState.currentOffer, id: 2};
    const newOffers = [...state.offers];
    newOffers[payloadOffer.id - 1] = payloadOffer;
    expect(appReducer(state, changeOffers(payloadOffer)))
      .toEqual({...state, offers: newOffers});
  });
});
