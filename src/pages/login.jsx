import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Input } from '../components/Input';
import API from '../api';
import 'react-toastify/dist/ReactToastify.css';

const signInAction = (token, isLogged, user) => ({
  type: 'auth/LOGIN', token, isLogged, user,
});

const Login = () => {
  const [user, setuser] = useState();
  const dispatch = useDispatch();
  const token = useSelector((store) => store);

  function getValue(e) {
    setuser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  function signIn(e) {
    e.preventDefault();
    API.post('login', user)
      .then((result) => {
        if (result.status === 200) {
          toast.success('Logado com sucesso!');
          setTimeout(() => {
            dispatch(signInAction(result.data.token, true, { email: user.email, id: result.data.id }));
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <ToastContainer autoClose={1800} />
      { token.isLogged && <Redirect to="/" />}
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

export default Login;
