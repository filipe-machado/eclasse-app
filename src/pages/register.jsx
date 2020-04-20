import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input } from '../components/Input';
import API from '../api';

function signInAction(token, isLogged, user) {
  return {
    type: 'auth/LOGIN', token, isLogged, user,
  };
}

const Register = () => {
  const [user, setuser] = useState({});

  const token = useSelector((store) => store);

  console.log(token);

  // TODO: ao tentar o login e nao tiver conta, carregar os dados aqui
  // eslint-disable-next-line no-unused-vars
  const logged = useSelector((state) => state);
  const dispatch = useDispatch();

  function getValue(e) {
    setuser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  function signIn(e) {
    e.preventDefault();
    API.post('login', user).then((result) => {
      console.log(result);
      if (result.status === 200) {
        dispatch(signInAction(result.data.token, true, user));
      }
    });
  }

  return (
    <>
      <div className="container align-content-center form-login">
        <h1 className="usuarios">Registro</h1>
        <form onSubmit={signIn} method="post">
          <Input label="email" modifier="email" hadleChange={getValue} />
          <Input label="senha" modifier="senha" type="password" hadleChange={getValue} />
          <Input label="repita senha" modifier="senha-rpt" type="password" hadleChange={getValue} />
          <button className="btn-primary submit" type="submit">
            Registrar
            <i className="icon icon-right">&#xe800;</i>
          </button>
        </form>
        <p className="account-details">Já tem uma conta?</p>
        <div className="btn-unform">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <i className="icon icon-left-open">&#xe802;</i>
          <Link to="/login">ENTRAR</Link>
        </div>
      </div>
    </>
  );
};

export default Register;
