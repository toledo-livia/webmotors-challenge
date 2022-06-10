/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { darken } from 'polished';
import PropTypes from 'prop-types';
import { ReactSelectInput as ReactSelect } from './ReactSelect';
import './Select.scss';

const customSelectStyle = {
  control: () => ({
    display: 'flex',
    backgroundColor: 'transparent',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  }),
  menu: (provided) => ({
    ...provided,
    position: 'absolute',
    top: '120%',
    width: '100%',
    backgroundColor: '#f1f1f1',
    borderRadius: 4,
  }),
  dropdownIndicator: (provided, { isFocused }) => ({
    fontSize: 10,
    color: isFocused ? darken(0.2, '#999') : '#999',
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: '#fff',
    borderRadius: '50%',
    padding: 2,
    background: 'rgba(150, 150, 150, 0.4)',
    fontSize: 8,
    cursor: 'pointer',
  }),
  option: (provided, { isSelected, isFocused }) => ({
    ...provided,
    fontSize: 14,
    backgroundColor: (isSelected || isFocused) && '#f51344',
    color: isSelected || isFocused ? '#fff' : '#999',
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: 14,
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: 14,
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 0,
    maxWidth: 40,
  }),
  input: (provided) => ({
    ...provided,
    flex: 1,
  }),
};

const Select = ({ icon: Icon, label, options, style, ...rest }) => {
  return (
    <label className="container-select" style={style}>
      {Icon && <div className="icon-container">{Icon}</div>}
      {label && <span>{label}:</span>}
      <ReactSelect
        id="selector"
        {...rest}
        options={options}
        defaultOptions
        styles={customSelectStyle}
      />
    </label>
  );
}

Select.propTypes = {
  icon: PropTypes.element,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  style: PropTypes.oneOf(PropTypes.array, PropTypes.object),
};

Select.defaultProps = {
  icon: null,
  options: [],
  style: {},
  label: null,
};

export default Select;