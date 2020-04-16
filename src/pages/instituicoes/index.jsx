import React, { useEffect, useState } from 'react';
import API from '../../api';

export default function Instituicao() {
  const [instituicao, setinstituicao] = useState([]);
  useEffect(() => {
    function getInstituicoes() {
      const instituicoes = window.location.pathname;
      API.get(instituicoes).then((result) => {
        setinstituicao(result.data);
      });
    }
    getInstituicoes();
  }, []);

  return (
    <>
      <ul>
        {instituicao !== null && instituicao.map((result) => (
          <>
            <li key={`1221${result.id}`}>{result.nome}</li>
            <li key={`1222${result.id}`}>{result.endereco}</li>
            <li key={`1223${result.id}`}>{result.cidade}</li>
            <li key={`1224${result.id}`}>{result.uf}</li>
            <br key={`1225${result.id}`} />
          </>
        ))}
      </ul>
    </>
  );
}
