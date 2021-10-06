import Main from '../main/main';

export type RoomProps = {
  type: string;
  name: string;
  price: number;
  id: number;
  isFavorite: boolean;
  isPremium: boolean;
}

export type AppProps = {
  rooms: RoomProps[],
  count: number;
  location: string;
};

function App(props: AppProps): JSX.Element {
  return <Main {...props} />;
}

export default App;
