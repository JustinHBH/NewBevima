// Rating.js
import React from 'react';
import PropTypes from 'prop-types';
import ReactRating from 'react-rating';
import './Rating.css'; 

const Rating = ({ rating, onRate }) => {
  return (
    <div className="rating">
      <ReactRating
        initialRating={rating}
        emptySymbol={<span className="star-outline">★</span>}
        fullSymbol={<span className="star-filled">★</span>}
        onClick={(value) => onRate(value)}
      />
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  onRate: PropTypes.func.isRequired,
};

export default Rating;
