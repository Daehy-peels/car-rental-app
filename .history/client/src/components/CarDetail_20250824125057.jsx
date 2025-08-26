// src/components/CarDetail.jsx
import React, { useState, useEffect } from "react";
import {
  FaStar,
  FaUsers,
  FaGasPump,
  FaCog,
  FaCar,
  FaTimes,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CarReviews from "./CarReviews";
import { getCarAverageRating } from "../services/api";

const CarDetail = ({ car, onClose, onAuthClick, currentUser }) => {
  const navigate = useNavigate();
  const [averageRating, setAverageRating] = useState("0.0");

  useEffect(() => {
    const fetchRating = async () => {
      const rating = await getCarAverageRating(car.car_id);
      setAverageRating(rating);
    };
    fetchRating();
  }, [car.car_id]);

  const handleBooking = () => {
    if (currentUser) {
      navigate(`/book/${car.car_id}`);
    } else {
      onAuthClick();
      toast.info("Please log in to book this car.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 sm:p-8 animate-fade-in-up my-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <FaTimes size={24} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Car Image and Info */}
          <div className="flex flex-col items-center">
            <img
              src={car.image_url}
              alt={`${car.make} ${car.model}`}
              className="w-full h-auto object-cover rounded-lg shadow-lg mb-4"
            />
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                {car.make} {car.model}
              </h2>
              <p className="text-2xl font-bold text-primary my-2">
                ${car.price_per_day}
                <span className="text-sm text-gray-500 font-normal">
                  {" "}
                  / day
                </span>
              </p>
              <div className="flex items-center justify-center mt-2">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="font-semibold">{averageRating}</span>
              </div>
            </div>
          </div>

          {/* Car Details and Booking */}
          <div className="space-y-6">
            <p className="text-lg text-gray-600 border-b pb-4">
              {car.description}
            </p>

            {/* Car Specifications section */}
<div className="grid grid-cols-2 gap-4 text-gray-700">
  <div className="flex items-center space-x-2">
    <FaUsers className="text-primary" />
    <span>Seats: {car.seats || "N/A"}</span>
  </div>
  <div className="flex items-center space-x-2">
    <FaGasPump className="text-primary" />
    <span>Fuel: {car.fuel_type || "N/A"}</span>
  </div>
  <div className="flex items-center space-x-2">
    <FaCog className="text-primary" />
    <span>Transmission: {car.transmission || "N/A"}</span>
  </div>
  <div className="flex items-center space-x-2">
    <FaCar className="text-primary" />
    <span>Type: {car.car_type || "N/A"}</span>
  </div>
  <div className="flex items-center space-x-2">
    <FaMapMarkerAlt className="text-primary" />
    <span>Location: {car.location || "N/A"}</span>
  </div>
</div>

            <button
              onClick={handleBooking}
              className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-secondary transition-colors duration-300 transform hover:scale-105 shadow-md"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* New Reviews Section */}
        <CarReviews carId={car.car_id} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default CarDetail;
