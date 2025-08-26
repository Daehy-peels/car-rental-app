// src/components/CarCard.jsx
import React, { useState, useEffect } from "react";
import { FaStar, FaUsers, FaGasPump, FaCog } from "react-icons/fa";
import { getCarAverageRating } from "../services/api";

const CarCard = ({ car, onCardClick }) => {
  const [averageRating, setAverageRating] = useState("0.0");

  useEffect(() => {
    const fetchRating = async () => {
      const rating = await getCarAverageRating(car.car_id);
      setAverageRating(rating);
    };
    fetchRating();
  }, [car.car_id]);

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
          <FaStar className="mr-1" />
          <span className="text-gray-600 font-semibold">{averageRating}</span>
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
