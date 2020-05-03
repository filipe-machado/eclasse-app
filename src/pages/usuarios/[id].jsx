import React, { useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { createStore } from 'redux';
import login from '../../routes';
import API from '../../api';

export default function Usuario() {
  const [usuario, setusuario] = useState({});
  const token = useSelector((state) => state);
  console.log(token);
  useEffect(() => {
    function getUsusarios() {
      const user = window.location.pathname;
      API.get(user, { headers: { Authorization: `Bearer ${token.token}` } }).then((result) => {
        console.log(result);
        setusuario({ ...result.data[0] });
      });
    }
    getUsusarios();
  }, []);

  const store = createStore(login);

  return (
    <>
      <Provider store={store}>
        <ul>
          <li>{usuario.usuario}</li>
          <li>{usuario.email}</li>
          <li>{usuario.created_at}</li>
          <li>{usuario.updated_at}</li>
          <li>{usuario.ativo}</li>
          <li>{usuario.grupo_id}</li>
        </ul>
      </Provider>
    </>
  );
}
