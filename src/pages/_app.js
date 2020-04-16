/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import '../styles/index.scss';
import { Provider } from 'react-redux';
import { store } from '../store/ducks/auth';
import NavBar from '../components/NavBar';
import Login from './login';
import Register from './register';

function App() {
  return (
    <>
      <Provider store={store}>
        <NavBar
          classes="menu"
          child={
            (
              <>
                <Link href="/login"><a>login</a></Link>
                <Link href="/register"><a>register</a></Link>
              </>
            )
          }
        />
        <Login />
        <Register />
      </Provider>
    </>
  );
}

export default App;
