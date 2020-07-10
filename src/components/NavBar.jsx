import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

const signOutAction = () => ({
  type: 'auth/LOGOUT',
});

const NavBar = ({ classnames }) => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store);

  function signOut() {
    toast.success('Deslogado com sucesso!');
    dispatch(signOutAction());
  }

  return (
    <>
      <nav className={`${classnames}`}>
        <ToastContainer autoClose={1800} />
        <div>
          <div>
            <ul>
              {
                data.menu !== undefined
                  && data.menu.map((result, index) => (
                    <li key={1 + index}>
                      <Link to={`/${result.normalize('NFD').replace(/[^a-zA-Zs]/g, '')}`}>
                        {result.trim()}
                      </Link>
                    </li>
                  ))
              }
              {!data.isLogged
              && (
                <li><Link to="/login">Entrar</Link></li>
              )}

              {data.isLogged
              && (
                <li><Link to="/" onClick={signOut}>Sair</Link></li>
              )}
            </ul>
          </div>
        </div>

      </nav>
    </>
  );
};

NavBar.propTypes = {
  classnames: PropTypes.string.isRequired,
};

export default NavBar;
