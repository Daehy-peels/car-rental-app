// src/components/CarDetail.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; 
import { FaTimes, FaGasPump, FaCogs, FaUsers, FaTag } from "react-icons/fa";

// Accept currentUser and onAuthClick props
const CarDetail = ({ car, onClose, currentUser, onAuthClick }) => {
  const navigate = useNavigate();

  if (!car) return null;

  const handleBookNow = () => {
    if (currentUser) {
      navigate(`/book/${car.car_id}`);
      onClose(); // Close the modal after navigating
    } else {
      onAuthClick(); // Open the login modal
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full p-6 sm:p-8 animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <FaTimes size={24} />
        </button>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Car Image */}
          <div className="w-full md:w-1/2">
            <img
              src={car.image_url}
              alt={`${car.make} ${car.model}`}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>

          {/* Car Details */}
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-4xl font-bold text-text">
              {car.make} {car.model}
            </h2>
            <p className="text-gray-600 text-lg">{car.description}</p>
            <p className="text-3xl font-bold text-primary">
              ${car.price_per_day}
              <span className="text-base text-gray-500 font-normal"> / day</span>
            </p>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-center space-x-2">
                <FaUsers className="text-primary" />
                <span>Seats: 5</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaGasPump className="text-primary" />
                <span>Fuel: Petrol</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCogs className="text-primary" />
                <span>Transmission: Automatic</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaTag className="text-primary" />
                <span>Year: {car.year}</span>
              </div>
            </div>

            {/* Book Now Button */}
            <button
              onClick={handleBookNow}
              className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-secondary transition-colors duration-300 transform hover:scale-105"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;