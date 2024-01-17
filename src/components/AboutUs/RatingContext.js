import React, { createContext, useContext, useState } from 'react';

const RatingContext = createContext();

export const RatingProvider = ({ children }) => {
  const [userRating, setUserRating] = useState(0);
  const [adminRating, setAdminRating] = useState(0);

  const calculatePercentage = (rating) => {
    return rating * 20; // Each star corresponds to 20%
  };

  return (
    <RatingContext.Provider
      value={{ userRating, setUserRating, adminRating, setAdminRating, calculatePercentage }}
    >
      {children}
    </RatingContext.Provider>
  );
};

export const useRating = () => {
  const context = useContext(RatingContext);
  if (!context) {
    throw new Error('useRating must be used within a RatingProvider');
  }
  return context;
};