/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
// import _ from 'lodash';

// COMPONENTS
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { AutoComplete } from 'primereact/autocomplete';
import { SplitButton } from 'primereact/splitbutton';
import { Growl } from 'primereact/growl';

// FUNCTIONS
import { isValid } from '../helpers/functions';

// SERVICES
import InstitutionService from '../services/InstitutionService';
import GroupService from '../services/GroupService';

const Register = () => {
  const growl = useRef(null);
  const [user, setUser] = useState({
    usuario: '',
    email: '',
    senha: '',
    grupo_id: '',
  });
  const [grupos, setGrupos] = useState([]);
  const [instituicoes, setInstituicoes] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState({ nome: '' });
  const [filteredInstitutions, setFilteredInstitutions] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState({ nome: '' });
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [pass, setPass] = useState();
  const [disabled, setDisabled] = useState(true);

  const items = [
    {
      label: 'limpar',
      icon: 'pi pi-refresh',
      command: () => {
        growl.current.show({
          severity: 'success',
          summary: 'Updated',
          detail: 'Data Updated',
        });
      },
    },
  ];

  const getInstituicoes = async (value = '') => {
    if (isValid(value)) {
      setInstituicoes(await InstitutionService.getAnInstitutions(value));
    } else {
      setInstituicoes(await InstitutionService.getAllInstitutions());
    }
  };

  const getGrupos = async (value = '') => {
    if (isValid(value)) {
      setGrupos(await GroupService.getAllGroups(value));
    } else {
      setGrupos(await GroupService.getAllGroups());
    }
  };

  useEffect(() => {
    getInstituicoes();
    getGrupos();
  }, []);

  /* const viewGrupos = _.debounce((name, value) => {
    getGrupos(value);
  }, 1000);

  const handleUpdate = () => {
    if (grupos.length === 0) {
      setTimeout(() => {
        setGrupos({ grupos });
      }, 1000);
    }
  }; */

  const handleUser = ({ currentTarget: { name, value } }) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const filterInstitutions = (event) => {
    setTimeout(() => {
      let results = [];
      if (event.query.length === 0) {
        results = instituicoes;
      } else {
        instituicoes.filter((brand) => brand.nome.toLowerCase().startsWith(event.query.toLowerCase()) && results.push(brand));
      }
      setFilteredInstitutions(results);
    }, 250);
  };

  const filterGroups = (event) => {
    setTimeout(() => {
      let results = [];
      if (event.query.length === 0) {
        results = grupos;
      } else {
        grupos.filter((brand) => brand.nome.toLowerCase().startsWith(event.query.toLowerCase()) && results.push(brand));
      }
      setFilteredGroups(results);
    }, 250);
  };

  const optionInstitutionTemplate = (brand) => (
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

  const optionGroupTemplate = (brand) => (
    <div className="p-clearfix">
      <p style={{ fontSize: '16px', margin: '1px 0 1px 0' }}>
        {brand.nome}
      </p>
    </div>
  );

  const passConfirm = ({ currentTarget: { name, value } }) => {
    name === 'senha' ? setUser({ ...user, senha: value }) : setPass(value);
  };

  const comparePass = () => {
    user.senha === pass ? setDisabled(false) : setDisabled(true);
  };

  const save = () => {
    growl.current.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Data Saved',
    });
  };

  return (
    <div className="p-grid">
      <Growl ref={growl} />
      <div className="img-avatar-box">
        <img src={`https://unavatar.now.sh/${user != null && isValid(user.email) ? user.email : 'anonimous'}`} alt="avatar" />
      </div>
      <div className="p-col">
        <form className="input-box p-fluid">
          <div className="input-box">
            <label htmlFor="institution">instituição</label>
            <AutoComplete
              value={selectedInstitution.nome != null ? selectedInstitution.nome : selectedInstitution}
              suggestions={filteredInstitutions}
              completeMethod={filterInstitutions}
              size={30}
              minLength={1}
              placeholder="selecione a instituição"
              dropdown
              itemTemplate={optionInstitutionTemplate}
              onChange={(e) => setSelectedInstitution(e.target.value)}
            />
          </div>
          <div className="input-box">
            <label htmlFor="group">tipo de usuário</label>
            <AutoComplete
              value={selectedGroup.nome != null ? selectedGroup.nome : selectedGroup}
              suggestions={filteredGroups}
              completeMethod={filterGroups}
              size={30}
              minLength={1}
              placeholder="selecione o tipo de usuário"
              dropdown
              itemTemplate={optionGroupTemplate}
              onChange={(e) => setSelectedGroup(e.target.value)}
            />
          </div>
          <div className="input-box">
            <label htmlFor="usuario">usuário</label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user" />
              </span>
              <InputText
                name="usuario"
                id="usuario"
                type="text"
                value={isValid(user) ? user.usuario : ''}
                onChange={handleUser}
                autoComplete="usuario"
              />
            </div>
          </div>
          <div className="input-box">
            <label htmlFor="email">email</label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-envelope" />
              </span>
              <InputText
                name="email"
                id="email"
                type="email"
                value={isValid(user) ? user.email : ''}
                onChange={handleUser}
                autoComplete="email"
                required
              />
            </div>
          </div>
          <div className="input-box">
            <label htmlFor="senha">senha</label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-lock" />
              </span>
              <Password
                name="senha"
                id="senha"
                promptLabel="digite uma senha"
                value={isValid(user) ? user.senha : ''}
                onChange={passConfirm}
                weakLabel="fraca"
                mediumLabel="média"
                strongLabel="forte"
                autoComplete="new-senha"
                required
                onKeyUp={comparePass}
              />
            </div>
          </div>
          <div className="input-box">
            <label htmlFor="rsenha">confirme a senha</label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-lock" />
              </span>
              <Password
                name="rsenha"
                id="rsenha"
                promptLabel="repita a senha"
                value={isValid(pass) ? pass : ''}
                onChange={passConfirm}
                autoComplete="new-senha"
                feedback={false}
                required
                onKeyUp={comparePass}
              />
            </div>
          </div>
          <SplitButton
            label="Registrar"
            icon="pi pi-save"
            disabled={disabled}
            onClick={save}
            model={items}
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
