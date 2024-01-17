import React, { useState } from 'react';

const StarRating = ({ onRatingChange, starColor }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleMouseEnter = (hoveredStar) => {
    setHoveredRating(hoveredStar);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleStarClick = (clickedStar) => {
    setRating(clickedStar);
    onRatingChange(clickedStar);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleStarClick(star)}
          style={{
            cursor: 'pointer',
            color: star <= (hoveredRating || rating) ? (hoveredRating ? starColor : 'yellow') : 'gray',
            fontSize: '40px', 
          }}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;