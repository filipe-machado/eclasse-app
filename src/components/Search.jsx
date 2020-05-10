import React from 'react';
import PropTypes from 'prop-types';

export const Search = ({
  modifier, label, type, hadleChange, classes, list,
}) => (
  <div id={modifier} className={`input-group ${classes}`}>
    <label className="uk-form-label" htmlFor={modifier}>{label}</label>
    <input list={list} className="uk-input" name={modifier} type={type} onChange={hadleChange} />
  </div>
);

Search.propTypes = {
  modifier: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  hadleChange: PropTypes.func.isRequired,
  classes: PropTypes.string,
  list: PropTypes.string,
};

Search.defaultProps = {
  label: '',
  type: 'text',
  classes: '',
  list: '',
};

export default Search;
