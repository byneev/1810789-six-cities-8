type Data = {
  rooms: {
    type: string;
    name: string;
    price: number;
    id: number;
  }[];
  count: number;
};

export const mockData: Data = {
  rooms: [
    {
      type: 'Bungalo',
      name: 'Great place nearby river',
      price: 120,
      id: 1,
    },
    {
      type: 'Appartaments',
      name: 'Amazing place',
      price: 90,
      id: 2,
    },
    {
      type: 'Bungalo',
      name: 'Poor insane place',
      price: 66,
      id: 3,
    },
    {
      type: 'Castle ',
      name: 'Great place nearby woods',
      price: 300,
      id: 4,
    },
    {
      type: 'Palace ',
      name: 'House in desert',
      price: 551,
      id: 5,
    },
  ],
  count: 333,
};
