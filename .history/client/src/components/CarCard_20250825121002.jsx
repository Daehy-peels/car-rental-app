// src/components/CarCard.jsx
import React from "react";
import { FaStar, FaUsers, FaGasPump, FaCog } from "react-icons/fa";

const CarCard = ({ car, onCardClick }) => {
  // Function to render stars based on the rating
  const renderStars = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating * 2) / 2; // Round to nearest half
    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-yellow-400 opacity-50" />);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
    }

    return stars;
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer"
      onClick={() => onCardClick(car)}
    >
      <img
        src={car.image_url}
        alt={`${car.make} ${car.model}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800">
          {car.make} {car.model}
        </h3>
        <div className="flex items-center text-yellow-400 my-2">
          {car.average_rating ? (
            <>
              {renderStars(car.average_rating)}
              <span className="text-gray-600 font-semibold ml-2">
                {parseFloat(car.average_rating).toFixed(1)}
              </span>
            </>
          ) : (
            <span className="text-gray-500">No reviews yet</span>
          )}
        </div>
        <p className="text-lg font-semibold text-primary mb-4">
          ${car.price_per_day}
          <span className="text-sm text-gray-500 font-normal"> / day</span>
        </p>
        <div className="flex justify-between text-gray-500 text-sm">
          <div className="flex items-center">
            <FaUsers className="mr-1" />
            <span>{car.seats} seats</span>
          </div>
          <div className="flex items-center">
            <FaGasPump className="mr-1" />
            <span>{car.fuel_type}</span>
          </div>
          <div className="flex items-center">
            <FaCog className="mr-1" />
            <span>{car.transmission}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
