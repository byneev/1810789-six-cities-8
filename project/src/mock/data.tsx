import type { AppProps, RoomProps } from '../components/app/app';

export const mockData: AppProps = {
  count: 7,
  location: 'Amsterdam',
};

export const mockRooms: RoomProps =
  [
    {
      type: 'Bungalo',
      name: 'Great place nearby river',
      price: 120,
      id: 1,
      isFavorite: false,
      isPremium: true,
    },
    {
      type: 'Appartaments',
      name: 'Amazing place',
      price: 90,
      id: 2,
      isFavorite: false,
      isPremium: false,
    },
    {
      type: 'Bungalo',
      name: 'Poor insane place',
      price: 66,
      id: 3,
      isFavorite: false,
      isPremium: true,
    },
    {
      type: 'Castle ',
      name: 'Great place nearby woods',
      price: 300,
      id: 4,
      isFavorite: false,
      isPremium: false,
    },
    {
      type: 'Palace ',
      name: 'House in desert',
      price: 551,
      id: 5,
      isFavorite: false,
      isPremium: true,
    },
    {
      type: 'Castle ',
      name: 'Great place nearby woods',
      price: 300,
      id: 6,
      isFavorite: true,
      isPremium: false,
    },
    {
      type: 'Palace ',
      name: 'House in desert',
      price: 551,
      id: 7,
      isFavorite: true,
      isPremium: false,
    },
  ];

