import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/ducks/auth';
import API from '../api';

export default function Home() {
  const [isLogged, setisLogged] = useState(true);
  useEffect(() => {
    console.log(API);
    function logado() {
      if (!isLogged) {
        window.location.href = '/login';
        setisLogged();
      }
    }
    logado();
  }, []);

  store.subscribe(() => console.log(store.getState()));

  function disparar() {
    store.dispatch({ type: 'auth/LOGIN' });
  }

  return (
    <>
      <Provider store={store}>
        <button type="button" onClick={disparar}>ATUALIZAR</button>
      </Provider>
    </>
  );
}
