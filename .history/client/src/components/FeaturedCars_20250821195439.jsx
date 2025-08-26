// src/components/FeaturedCars.jsx
import React, { useState, useEffect } from "react";
import CarCard from "./CarCard";
import { fetchFeaturedCars } from "../services/api";

const FeaturedCars = ({ onCardClick }) => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeaturedCars = async () => {
      const cars = await fetchFeaturedCars(3); // Fetch 3 featured cars
      setFeaturedCars(cars);
      setLoading(false);
    };
    getFeaturedCars();
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <p className="text-center text-lg text-gray-500 animate-pulse">
            Loading featured cars...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-text text-center mb-10">
          Featured Vehicles
        </h2>
        {featuredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <CarCard key={car.car_id} car={car} onCardClick={onCardClick} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-500">
            No featured cars available at the moment.
          </p>
        )}
      </div>
    </section>
  );
};

export default FeaturedCars;
