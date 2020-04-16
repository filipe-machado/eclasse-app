import React from 'react';
import PropTypes from 'prop-types';

const NavBar = ({ classes, child }) => (
  <nav className={classes}>
    {child}
  </nav>
);

NavBar.propTypes = {
  classes: PropTypes.string.isRequired,
  child: PropTypes.node,
};

NavBar.defaultProps = {
  child: null,
};

export default NavBar;
