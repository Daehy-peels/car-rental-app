// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import { fetchCars } from "../services/api";
import Hero from "../components/Hero";
import CarCard from "../components/CarCard";
import FeaturedCars from "../components/FeaturedCars";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const HomePage = ({ onAuthClick, currentUser }) => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const getCars = async () => {
      const carList = await fetchCars();
      setCars(carList);
    };
    getCars();
  }, []);

  // Updated handler to navigate instead of showing a modal
  const handleCardClick = (car) => {
    navigate(`/cars/${car.car_id}`);
  };

  return (
    <div>
      <Hero />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-4xl font-bold text-text mb-10 text-center animate-fade-in">
          Our Premium Fleet
        </h2>
        {cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <CarCard
                key={car.car_id}
                car={car}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-500 animate-pulse">
            Loading cars or no cars available...
          </p>
        )}
      </main>
      <FeaturedCars onCardClick={handleCardClick} />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default HomePage;
