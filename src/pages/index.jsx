import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import API from '../api';
import Layout from '../components/Layout';

export default function Home() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState({});
  const storage = useSelector((store) => store);

  useEffect(() => {
    setLoading(true);
    if (storage.isLogged) {
      API.get(`usuarios/${storage.user.id}`, storage.token !== null && { headers: { Authorization: `Bearer ${storage.token}` } })
        .then((result) => {
          setUser(result);
        })
        .catch((err) => {
          setError(error, err);
        })
        .finally(() => {
          setLoading(isLoading, false);
        });
    }
  }, []);

  return (
    <>
      <div className="home">
        <Layout />
        {
          !storage.isLogged
          && (
            <>
              <div className="uk-container uk-container-xsmall">
                <div className="presentation uk-grid-match uk-child-width-1-3@m" data-uk-grid>
                  <h1>Saiba o que acontece em sala de aula</h1>
                  <p>
                    Fique próximo do seu filho, sem precisar sair de casa,
                    monitore o comportamento e tenha conhecimento do desempenho do seu filho.
                  </p>
                </div>
              </div>

              <div className="uk-container uk-container-xsmall">
                <div className="uk-child-width-1-3@m" data-uk-grid data-uk-scrollspy="cls: uk-animation-fade; target: .uk-card; delay: 500; repeat: true">
                  <div>
                    <div className="uk-card uk-card-default uk-card-body" data-uk-scrollspy-class="uk-animation-slide-left">
                      <h3 className="uk-card-title">Frequência</h3>
                      <p>Seja notificado em caso de faltas.</p>
                    </div>
                  </div>
                  <div>
                    <div className="uk-card uk-card-default uk-card-body">
                      <h3 className="uk-card-title">Notas</h3>
                      <p>Tenha conhecimento das notas do aluno de forma rápida e prática.</p>
                    </div>
                  </div>
                  <div>
                    <div className="uk-card uk-card-default uk-card-body">
                      <h3 className="uk-card-title">Comportamento</h3>
                      <p>Saiba o que acontece no cotidiano do seu filho.</p>
                    </div>
                  </div>
                  <div>
                    <div className="uk-card uk-card-default uk-card-body">
                      <h3 className="uk-card-title">Compromissos</h3>
                      <p>
                        Receba notificações de quando haverá reuniões ou encontros na instituição.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }

        {
          user.data !== undefined && user.data.map((result) => (
            <>
              <div className="uk-container uk-container-xsmall">
                <div className="presentation uk-grid-match uk-child-width-1-3@m" data-uk-grid>
                  <h1>
                    {`Olá, ${result.usuario}`}
                  </h1>
                  <p>
                    Fique próximo do seu filho, sem precisar sair de casa,
                    monitore o comportamento e tenha conhecimento do desempenho do seu filho.
                  </p>
                </div>
              </div>
            </>
          ))
        }
      </div>
    </>
  );
}
