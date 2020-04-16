import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({ modifier, label, type, hadleChange }) => (
  <div className="input-group">
    <label className="label-form" htmlFor={modifier}>{label}</label>
    <input className="input-form" id={modifier} name={modifier} type={type} onChange={hadleChange} />
  </div>
);

Input.propTypes = {
  modifier: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  hadleChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  label: '',
  type: 'text',
};

export default Input;
