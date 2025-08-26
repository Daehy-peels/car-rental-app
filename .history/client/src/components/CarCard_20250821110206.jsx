// src/components/CarCard.jsx
import React from "react";
import { FaGasPump, FaCogs, FaUsers } from "react-icons/fa"; // Assuming you want to add icons for specs

const CarCard = ({ car, onCardClick }) => {
  return (
    <div
      onClick={() => onCardClick(car)}
      className="bg-white rounded-xl overflow-hidden shadow-xl border border-gray-200 transform hover:scale-105 transition-all duration-300 group cursor-pointer"
    >
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

        {/* Placeholder for car specs - you can replace with real data */}
        <div className="flex items-center space-x-4 text-gray-600 text-sm">
          <div className="flex items-center space-x-1">
            <FaUsers />
            <span>5 Seats</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaCogs />
            <span>Auto</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaGasPump />
            <span>Petrol</span>
          </div>
        </div>

        <button className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-secondary transition-colors duration-300 mt-4">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default CarCard;
