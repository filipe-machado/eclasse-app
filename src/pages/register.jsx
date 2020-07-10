import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import { Input } from '../components/Input';
import API from '../api';
import 'react-toastify/dist/ReactToastify.css';
import { Select } from '../components/Select';
import { Search } from '../components/Search';

const Register = () => {
  const [user, setuser] = useState({});
  const [grupos, setGrupos] = useState([]);
  const [instituicoes, setInstituicoes] = useState([]);


  useEffect(() => {
    const getGrupos = () => {
      API.get('grupos').then((result) => {
        setGrupos(result.data);
      });
    };
    getGrupos();
  }, []);

  function getValue(e) {
    const { name, value } = e.target;
    if (name === 'tipoUsuario') {
      const alunoInput = document.querySelector('#aluno');
      if (parseFloat(value) === 4) {
        alunoInput.classList.remove('hidden');
        alunoInput.setAttribute('required', '');
      } else {
        alunoInput.classList.add('hidden');
        alunoInput.removeAttribute('required');
      }
    }
    setuser({
      ...user,
      [name]: value,
    });
  }

  function register(e) {
    e.preventDefault();
    if (document.querySelector('#senha').value !== document.querySelector('#senha-rpt').value) {
      toast.error('senhas não conferem');
      return;
    }
    API.post('register', { usuario: user.usuario, email: user.email, senha: user.senha }).then((result) => {
      if (result.status === 201) {
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    }).catch((err) => console.log(err.error));
  }

  // eslint-disable-next-line func-names
  const getInstituicoes = function (name, value) {
    if (value.length > 3) {
      API.get(`instituicoes/${value}`).then((result) => {
        if (result !== undefined) {
          setInstituicoes(result.data);
        }
      });
    }
  };

  const viewInstituicoes = _.debounce((name, value) => {
    getInstituicoes(name, value);
  }, 1000);

  return (
    <>
      <ToastContainer autoClose={1800} />
      <div className="container align-content-center form-login">
        <h1 className="usuarios">Registro</h1>
        <form onSubmit={register} method="post">

          <Input label="usuario" modifier="usuario" hadleChange={getValue} />
          <Input label="email" modifier="email" hadleChange={getValue} />
          <Search list="instituicoes-list" label="instituição" modifier="instituicao" hadleChange={(e) => viewInstituicoes(e.target.name, e.target.value)} />
          <Select modifier="tipoUsuario" label="grupo" placeholder="Nenhum grupo cadastrado" active="Selecione o tipo de usuário" options={grupos} hadleChange={getValue} />
          <Input classes="hidden" label="cpf do aluno" modifier="aluno" type="text" hadleChange={getValue} />
          <Input label="senha" modifier="senha" type="password" hadleChange={getValue} />
          <Input label="repita senha" modifier="senha-rpt" type="password" hadleChange={getValue} />
          <div className="ui search">
            <div className="ui icon input">
              <input className="prompt" type="text" placeholder="Search countries..." />
              <i className="search icon"></i>
            </div>
            <div className="results"></div>
          </div>
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
      {/* FAZER ALGO QUE SIMULE ISSO */}
      <div className="uk-autocomplete uk-form" data-uk-autocomplete={`{source: ${instituicoes}}`}>
        <Input type="text" value={instituicoes.nome} />
      </div>
      {/* <datalist id="instituicoes-list">
        {
          instituicoes.map((result) => <option value={result.nome} label={`${result.endereco}`} />)
        }
      </datalist> */}
    </>
  );
};

export default Register;
