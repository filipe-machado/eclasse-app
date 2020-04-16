import React, { useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input } from '../components/Input';
import API from '../api';

function signInAction(token, isLogged, user) {
  return {
    type: 'auth/LOGIN', token, isLogged, user,
  };
}

const Login = () => {
  const [user, setuser] = useState({});

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
        <h1 className="usuarios">Login</h1>
        <form onSubmit={signIn} method="post">
          <Input label="email" modifier="email" hadleChange={getValue} />
          <Input label="senha" modifier="senha" type="password" hadleChange={getValue} />
          <button className="btn-primary submit" type="submit">
            Entrar
            <i className="icon icon-right">&#xe800;</i>
          </button>
        </form>
        <p className="account-details">Ainda não tem uma conta?</p>
        <div className="btn-unform">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link to="/register">REGISTRAR</Link>
          <i className="icon icon-right-open">&#xe801;</i>
        </div>
      </div>
    </>
  );
};

export default connect((state) => ({ modules: state }))(Login);
