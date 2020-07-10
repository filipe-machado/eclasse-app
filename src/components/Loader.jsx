import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import loader1 from '../assets/loader-1.svg';
import loader2 from '../assets/loader-2.svg';
import loader3 from '../assets/loader-3.svg';

export default function Loader({ stateLoader }) {
  const [iconLoader, setIconLoader] = useState(loader1);

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
  }

  useEffect(() => {
    const icon = getRandomInt(1, 4);
    switch (icon) {
      case 1:
        setIconLoader(loader1);
        break;
      case 2:
        setIconLoader(loader2);
        break;
      case 3:
        setIconLoader(loader3);
        break;
      default:
        setIconLoader(loader1);
    }
  }, []);

  return (
    <div className={stateLoader ? 'loader' : 'hidden'}>
      <img src={iconLoader} alt="loader" />
    </div>
  );
}

Loader.propTypes = {
  stateLoader: PropTypes.bool.isRequired,
};
