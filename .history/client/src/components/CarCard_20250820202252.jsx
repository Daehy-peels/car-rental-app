// src/components/CarCard.jsx
import React from "react";

const CarCard = ({ car }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-xl border border-gray-200 transform hover:scale-105 transition-all duration-300 group">
      <img
        src={car.image_url}
        alt={`${car.make} ${car.model}`}
        className="w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-80"
      />
      <div className="p-6 space-y-3">
        <h3 className="text-2xl font-bold text-text">
          {car.make} {car.model}
        </h3>
        <p className="text-lg text-primary font-bold">
          ${car.price_per_day}{" "}
          <span className="text-sm text-gray-500 font-normal">/ day</span>
        </p>
        <p className="text-sm text-gray-600 font-medium">Year: {car.year}</p>
        <button className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-secondary transition-colors duration-300 mt-4">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default CarCard;
