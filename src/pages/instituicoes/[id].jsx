import React, { useEffect, useState } from 'react';
import { API } from '../../api';

export default function Instituicao() {
  const [instituicao, setinstituicao] = useState({});
  useEffect(() => {
    function getInstituicoes() {
      const instituicoes = window.location.pathname;
      API.get(instituicoes).then((result) => {
        setinstituicao({ ...result.data[0] });
      });
    }
    getInstituicoes();
  }, []);

  return (
    <>
      <ul>
        <li>
          <b>Nome:</b>
          {instituicao.nome}
        </li>
        <li>
          <b>Cidade:</b>
          {instituicao.cidade}
        </li>
        <li>
          <b>UF:</b>
          {instituicao.uf}
        </li>
        <li>
          <b>Endereço:</b>
          {instituicao.endereco}
        </li>
        <li>
          <b>Ativo:</b>
          {instituicao.ativo}
        </li>
      </ul>
    </>
  );
}
