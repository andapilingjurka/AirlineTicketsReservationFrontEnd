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
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h4 style={{ textAlign: 'center',fontFamily: '"Times New Roman", Times, serif', fontWeight: 'bold' }}>Vlerësimi me Yjet</h4>

      <div style={{ display: 'flex', justifyContent: 'center' }}>

        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleStarClick(star)}
            style={{
              cursor: 'pointer',
              color: star <= (hoveredRating || rating) ? '#ff8b00' : 'grey',
              fontSize: '50px',
            }}
          >
            &#9733;
          </span>
        ))}
      </div>
    </div>
  );
};

export default StarRating;