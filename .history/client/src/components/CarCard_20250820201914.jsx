// src/components/CarCard.jsx
import React from "react";

const CarCard = ({ car }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img
        src={car.image_url}
        alt={`${car.make} ${car.model}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">
          {car.make} {car.model}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          <span className="font-semibold">Year:</span> {car.year}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <span className="font-semibold">Price:</span> ${car.price_per_day} /
          day
        </p>
      </div>
    </div>
  );
};

export default CarCard;
