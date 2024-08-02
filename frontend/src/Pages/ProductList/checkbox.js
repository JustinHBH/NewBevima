// Checkbox.js
import React from 'react';

const Checkbox = ({ id, title, name, handleChange, checked }) => {
  return (
    <div className="checkbox-item">
      <input
        id={id}
        type="checkbox"
        name={name}
        onChange={handleChange}
        checked={checked}
      />
      <label htmlFor={id}>{title}</label>
    </div>
  );
};

export default Checkbox;
