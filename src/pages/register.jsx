import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../components/Input';
import API from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [user, setuser] = useState({});

  // TODO: ao tentar o login e nao tiver conta, carregar os dados aqui
  // eslint-disable-next-line no-unused-vars
  /* const logged = useSelector((state) => state);
  const dispatch = useDispatch(); */

  function getValue(e) {
    setuser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  function register(e) {
    e.preventDefault();
    if (document.querySelector("#senha").value !== document.querySelector("#senha-rpt").value) {
      toast.error("senhas não conferem");
      return;
    }
    API.post('register', { usuario: user.usuario, email: user.email, senha: user.senha }).then((result) => {
      console.log(result)
      if (result.status === 201) {
        setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
      }      
    }).catch(err => console.log(err.error));
  }

  return (
    <>
      <ToastContainer autoClose={1800} />
      <div className="container align-content-center form-login">
        <h1 className="usuarios">Registro</h1>
        <form onSubmit={register} method="post">
          <Input label="email" modifier="email" hadleChange={getValue} />
          <Input label="usuario" modifier="usuario" hadleChange={getValue} />
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
