import React from 'react';
import PropTypes from 'prop-types';
import NavBar from './NavBar';

const Layout = ({ child }) => (
  <>
    <NavBar classnames="navbar" />
    <main>
      {child}
    </main>
  </>
);

Layout.propTypes = {
  child: PropTypes.node,
};

Layout.defaultProps = {
  child: null,
};

export default Layout;
