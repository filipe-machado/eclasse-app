import React, { useEffect, useState } from 'react';
import API from '../../api';

export default function Professor() {
  const [professor, setprofessor] = useState([]);
  useEffect(() => {
    function getProfessores() {
      const professores = window.location.pathname;
      API.get(professores).then((result) => {
        setprofessor(result.data);
      });
    }
    getProfessores();
  }, []);

  return (
    <>
      <ul>
        {professor !== null && professor.map((result) => (
          <>
            <img style={{ maxWidth: '150px' }} src={result.fotosUrls} alt="perfil" />
            <li key={`1221${result.id}`}>{result.nome}</li>
            <li key={`1223${result.id}`}>{result.ativo}</li>
            <br key={`1225${result.id}`} />
          </>
        ))}
      </ul>
    </>
  );
}
