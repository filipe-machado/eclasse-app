import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({
  modifier, label, type, hadleChange, classes,
}) => (
  <div id={modifier} className={`input-group ${classes}`}>
    <label className="uk-form-label" htmlFor={modifier}>{label}</label>
    <input className="uk-input" name={modifier} type={type} onChange={hadleChange} />
  </div>
);

Input.propTypes = {
  modifier: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  hadleChange: PropTypes.func.isRequired,
  classes: PropTypes.string,
};

Input.defaultProps = {
  label: '',
  type: 'text',
  classes: '',
};

export default Input;