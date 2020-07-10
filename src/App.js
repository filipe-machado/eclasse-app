import React from 'react';
import { useSelector } from 'react-redux';
import Router from './routes';
import './styles/index.scss';
import Loader from './components/Loader';

function App() {
  const loading = useSelector((store) => store.loading);

  return (
    <>
      <Loader stateLoader={loading} />
      <Router />
    </>
  );
}

export default App;
