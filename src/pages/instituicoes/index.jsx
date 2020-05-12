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
            <li key={result.id.toString()}>{result.nome}</li>
            <li key={result.id.toString()}>{result.endereco}</li>
            <li key={result.id.toString()}>{result.cidade}</li>
            <li key={result.id.toString()}>{result.uf}</li>
          </>
        ))}
      </ul>
    </>
  );
}
