import React from 'react';
import PropTypes from 'prop-types';

const Layout = ({ child }) => (
  <>
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
