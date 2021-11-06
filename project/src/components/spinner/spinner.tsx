function Spinner():JSX.Element {
  return (
    <div className="spinner-block">
      <h2 className='spinner-text'>Six Cities is loading...</h2>
      <div className="spinner"></div>
    </div>
  );
}

export default Spinner;
