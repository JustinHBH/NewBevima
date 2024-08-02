import React from 'react';
import PropTypes from 'prop-types';
import './QuantitySelector.css'; 

const QuantitySelector = ({ quantity, onQuantityChange }) => {
  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    onQuantityChange(newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      onQuantityChange(newQuantity);
    }
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    const newQuantity = isNaN(value) ? 1 : value;
    onQuantityChange(newQuantity);
  };

  return (
    <div className="quantity-selector">
      <div>
        <button onClick={handleDecrement}>-</button>
        <input 
          type="number"
          id="quantity"
          name="quantity"
          value={quantity}
          min="1"
          onChange={handleInputChange}
        />
        <button onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
};

QuantitySelector.propTypes = {
  quantity: PropTypes.number.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
};

export default QuantitySelector;
