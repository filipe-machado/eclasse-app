import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PropTypes } from 'prop-types';
import { store } from '../../store/ducks/auth';

export default function Usuario({ token }) {
  const [usuario, setusuario] = useState({});
  useEffect(() => {
    console.log(token);
    function getUsusarios() {
      /* const user = window.location.pathname;
      API.get(user).then((result) => {
        setusuario({ ...result.data[0] });
      }); */
    }
    getUsusarios();
  }, []);

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

Usuario.propTypes = {
  token: PropTypes.string.isRequired,
};
