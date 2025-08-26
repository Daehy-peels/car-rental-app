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
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import CarReviews from "./CarReviews";
import { getCarAverageRating, fetchCars } from "../services/api"; // Import fetchCars

const CarDetail = ({ onAuthClick, currentUser }) => {
  const navigate = useNavigate();
  const { carId } = useParams(); // Get carId from URL parameters
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState("0.0");

  // New useEffect to fetch car data based on URL
  useEffect(() => {
    const getCarData = async () => {
      setLoading(true);
      try {
        const allCars = await fetchCars();
        const foundCar = allCars.find((c) => c.car_id === parseInt(carId));
        if (foundCar) {
          setCar(foundCar);
        } else {
          toast.error("Car not found.");
          navigate("/cars");
        }
      } catch (err) {
        toast.error("Failed to fetch car details.");
        navigate("/cars");
      }
      setLoading(false);
    };

    getCarData();
  }, [carId, navigate]);

  // useEffect to scroll to reviews section on load
  useEffect(() => {
    if (window.location.hash === "#reviews") {
      const reviewSection = document.getElementById("review-section");
      if (reviewSection) {
        reviewSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [car]); // Depend on 'car' so it runs after data is fetched

  // useEffect to fetch average rating
  useEffect(() => {
    if (car) {
      const fetchRating = async () => {
        const rating = await getCarAverageRating(car.car_id);
        setAverageRating(rating);
      };
      fetchRating();
    }
  }, [car]);

  const handleBooking = () => {
    if (currentUser) {
      navigate(`/book/${car.car_id}`);
    } else {
      onAuthClick();
      toast.info("Please log in to book this car.");
    }
  };

  if (loading || !car) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-500 animate-pulse">
          Loading car details...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative bg-white rounded-lg shadow-lg p-6 lg:p-10 mb-8">
        <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-10">
          <img
            src={car.image_url}
            alt={`${car.make} ${car.model}`}
            className="w-full lg:w-1/2 rounded-lg shadow-md"
          />
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">
              {car.make} {car.model}
            </h2>
            <div className="flex items-center space-x-2 text-xl text-yellow-400">
              <FaStar />
              <span className="text-gray-600 font-semibold">
                {averageRating}
              </span>
            </div>
            <p className="text-2xl font-semibold text-primary">
              ${car.price_per_day}
              <span className="text-sm text-gray-500 font-normal"> / day</span>
            </p>
            <p className="text-gray-600 text-lg">{car.description}</p>
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
      </div>
      <div id="review-section">
        <CarReviews carId={car.car_id} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default CarDetail;
