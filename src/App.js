import React from 'react';
import { useSelector } from 'react-redux';
import Router from './routes';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './styles/index.scss';

function App() {
  const loading = useSelector((store) => store.loading);

  return (
    <>
      {/* <Loader stateLoader={loading} /> */}
      <Router />
    </>
  );
}

export default App;
