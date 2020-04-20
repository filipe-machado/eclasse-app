import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import API from '../api';
import Layout from '../components/Layout';

export default function Home() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [alert, setAlert] = useState();
  const [user, setUser] = useState({});
  const token = useSelector((store) => store);

  useEffect(() => {
    setLoading(true);
    if (token.isLogged) {
      API.get('usuarios', token.token !== null && { headers: { Authorization: `Bearer ${token.token}` } })
        .then((result) => {
          setUser(result);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <>
      <Layout />

      <div className="uk-container uk-container-xsmall">
        <div className="home uk-grid-match uk-child-width-1-3@m" data-uk-grid>
          <h1>Saiba o que acontece em sala de aula</h1>
          <p>
            Fique próximo do seu filho, sem precisar sair de casa,
            monitore o comportamento e saiba as notas imediatamente.
          </p>
        </div>
      </div>

      <div className="uk-child-width-1-3@m" data-uk-grid data-uk-scrollspy="cls: uk-animation-fade; target: .uk-card; delay: 500; repeat: true">
        <div>
          <div className="uk-card uk-card-default uk-card-body" data-uk-scrollspy-class="uk-animation-slide-left">
            <h3 className="uk-card-title">Fade</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
        <div>
          <div className="uk-card uk-card-default uk-card-body">
            <h3 className="uk-card-title">Fade</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
        <div>
          <div className="uk-card uk-card-default uk-card-body">
            <h3 className="uk-card-title">Fade</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
        <div>
          <div className="uk-card uk-card-default uk-card-body">
            <h3 className="uk-card-title">Fade</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>


      {
        user.data !== undefined && user.data.map((result, index) => (
          <>
            <li>{result.usuario}</li>
            <li>{result.grupo_id}</li>
            <li>{result.email}</li>
            <li>{result.created_at}</li>
          </>
        ))
      }
    </>
  );
}
