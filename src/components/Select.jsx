import React from 'react';
import PropTypes, { any } from 'prop-types';

export const Select = ({
  modifier, label, hadleChange, options,
}) => (
  <div className="uk-margin">
    <label className="uk-form-label" htmlFor="form-stacked-select">{label}</label>
    <div className="uk-form-controls">
      <select id={`form-stacked-select ${modifier}`} name={modifier} className="uk-select" onChange={hadleChange}>
        {
          options.map((option) => <option value={option.id} key={option.id}>{option.nome}</option>)
        }
      </select>
    </div>
  </div>
);

Select.propTypes = {
  modifier: PropTypes.string,
  label: PropTypes.string,
  hadleChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(any).isRequired,
};

Select.defaultProps = {
  modifier: '',
  label: '',
};

export default Select;
