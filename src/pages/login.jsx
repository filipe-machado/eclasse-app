import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Input } from '../components/Input';
import API from '../api';
import 'react-toastify/dist/ReactToastify.css';

const signInAction = (token, isLogged, user) => ({
  type: 'auth/LOGIN', token, isLogged, user,
});

const setMenu = (menu) => ({
  type: 'MENU', menu,
});

const loader = (loading) => ({
  type: 'LOADING', loading,
});

const Login = () => {
  const [user, setuser] = useState();
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  function getValue({ currentTarget: { name, value } }) {
    setuser({
      ...user,
      [name]: value,
    });
  }

  function signIn(e) {
    e.preventDefault();
    dispatch(loader({ loading: true }));
    API.post('login', user)
      .then((result) => {
        if (result.status === 200) {
          dispatch(setMenu(result.data.permissoes));
          setTimeout(() => {
            dispatch(signInAction(result.data.token, true, {
              email: user.email,
              id: result.data.id,
              usuario: result.data.usuario,
            }));
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(dispatch(loader({ loading: false })));
  }

  /* function salvar() {
  let texto = document.getElementById("texto").value;
  let titulo = document.getElementById("titulo").value;
  let blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
  saveAs(blob, titulo + ".txt");
} */

  return (
    <>
      <ToastContainer autoClose={1800} />
      { store.isLogged && <Redirect to="/" />}
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
