import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import menu from '../assets/images/menu.svg';

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
      <nav className={`uk-navbar uk-navbar-container ${classnames}`}>
        <ToastContainer autoClose={1800} />
        <div className="uk-navbar-left">
          <Link className="uk-navbar-toggle" to="#!" data-uk-toggle="target: #offcanvas-push">
            <img src={menu} alt="menu" />
          </Link>
        </div>

        <div id="offcanvas-push" data-uk-offcanvas="mode: push; overlay: true">
          <div className="uk-offcanvas-bar">
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button className="uk-offcanvas-close" type="button" data-uk-close />
            <ul className="uk-navbar-nav">
              {
                // eslint-disable-next-line react/no-array-index-key
                data.menu !== undefined && data.menu.map((result, index) => <li key={1 + index}><Link to={`/${result.normalize('NFD').replace(/[^a-zA-Zs]/g, '')}`}>{result.trim()}</Link></li>)
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
