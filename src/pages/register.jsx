/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';

import { ToastContainer, toast } from 'react-toastify';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { AutoComplete } from 'primereact/autocomplete';
import { isValid } from '../helpers/functions';

import API from '../api';
import 'react-toastify/dist/ReactToastify.css';
import InstitutionService from '../services/InstitutionService';

const Register = () => {
  const [user, setUser] = useState({});
  const [grupos, setGrupos] = useState([]);
  const [instituicoes, setInstituicoes] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState({ nome: '' });
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [pass, setPass] = useState();

  // eslint-disable-next-line func-names
  const getInstituicoes = async function (value = '') {
    if (isValid(value)) {
      setInstituicoes(await InstitutionService.getAnInstitutions(value));
    } else {
      setInstituicoes(await InstitutionService.getAllInstitutions());
    }
  };

  useEffect(() => {
    getInstituicoes();
    API.get('grupos').then((result) => {
      if (result.status === 200) {
        setGrupos(result.data);
      }
    });
  }, []);

  const viewInstituicoes = _.debounce((name, value) => {
    getInstituicoes(name, value);
  }, 1000);

  const handleUpdate = () => {
    if (grupos.length === 0) {
      setTimeout(() => {
        setGrupos({ grupos });
      }, 1000);
    }
  };

  const handleUser = ({ currentTarget: { name, value } }) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const filterBrands = (event) => {
    setTimeout(() => {
      let results = [];
      if (event.query.length === 0) {
        results = instituicoes;
      } else {
        instituicoes.filter((brand) => brand.nome.toLowerCase().startsWith(event.query.toLowerCase()) && results.push(brand));
      }
      setFilteredBrands(results);
    }, 250);
  };

  const itemTemplate = (brand) => (
    <div className="p-clearfix">
      <p style={{ fontSize: '16px', margin: '1px 0 1px 0' }}>
        {brand.nome}
      </p>
      <p style={{ fontSize: '10px', margin: '1px 0 0 0' }}>
        {brand.endereco}
      </p>
      <p style={{ fontSize: '10px', margin: '1px 0 5px 0' }}>
        {brand.cidade}
        {' - '}
        {brand.uf}
      </p>
    </div>
  );

  return (
    <div className="p-grid">
      <ToastContainer autoClose={1800} />
      <div className="p-col">
        <form className="p-fluid">
          <div>
            <label htmlFor="institution">instituição</label>
            <AutoComplete
              value={selectedBrand.nome != null ? selectedBrand.nome : selectedBrand}
              suggestions={filteredBrands}
              completeMethod={filterBrands}
              size={30}
              minLength={1}
              placeholder="selecione a instituição"
              dropdown
              itemTemplate={itemTemplate}
              onChange={(e) => setSelectedBrand(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="username">usuário</label>
            <InputText
              name="username"
              id="username"
              type="text"
              value={isValid(user.username) ? user.username : ''}
              onChange={handleUser}
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="password">senha</label>
            <Password
              name="password"
              id="password"
              promptLabel="digite uma senha"
              value={isValid(user.password) ? user.password : ''}
              onChange={handleUser}
              weakLabel="fraca"
              mediumLabel="média"
              strongLabel="difícil"
              autoComplete="new-password"
            />
          </div>
          <div>
            <label htmlFor="password">confirme a senha</label>
            <Password
              name="rpassword"
              id="rpassword"
              promptLabel="repita a senha"
              value={isValid(pass) ? pass : ''}
              onChange={(e) => setPass(e.target.value)}
              autoComplete="new-password"
              feedback={false}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
