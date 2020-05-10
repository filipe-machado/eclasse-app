import React from 'react';
import PropTypes, { any } from 'prop-types';

export const Select = ({
  modifier, label, hadleChange, options, placeholder, active,
}) => (
  <>
    <div className="uk-margin">
      <label className="uk-form-label" htmlFor="form-stacked-select">{label}</label>
      <div className="uk-form-controls">
        <select id={`form-stacked-select ${modifier}`} name={modifier} className="uk-select" onChange={hadleChange}>
          <option disabled selected key="active">{active}</option>
          {
            options !== null ? options.map((option) => <><option value={option.id} key={option.id}>{option.nome}</option></>) : <option defaultValue disabled key="disabled">{placeholder}</option>
          }
        </select>
      </div>
    </div>
  </>
);

Select.propTypes = {
  modifier: PropTypes.string,
  label: PropTypes.string,
  hadleChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(any).isRequired,
  placeholder: PropTypes.string,
  active: PropTypes.string,
};

Select.defaultProps = {
  modifier: '',
  label: '',
  placeholder: '',
  active: '',
};

export default Select;
