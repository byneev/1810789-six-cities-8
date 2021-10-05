import Main from '../main/main';

type AppProps = {
  rooms: {
    type: string;
    name: string;
    price: number;
    id: number;
  }[],
  count: number;
};

function App(props: AppProps): JSX.Element {
  return <Main {...props} />;
}

export default App;
