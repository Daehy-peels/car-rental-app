// src/components/FeaturedCars.jsx
import React from "react";
import CarCard from "./CarCard";

const featuredCars = [
  {
    car_id: 1,
    make: "Honda",
    model: "Civic",
    year: 2022,
    price_per_day: 45,
    image_url: "https://example.com/images/honda-civic.jpg", // Replace with actual image URL
    seats: 5,
    fuel_type: "Petrol",
    transmission: "Automatic",
  },
  {
    car_id: 2,
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    price_per_day: 70,
    image_url: "https://example.com/images/tesla-model3.jpg", // Replace with actual image URL
    seats: 5,
    fuel_type: "Electric",
    transmission: "Automatic",
  },
  {
    car_id: 3,
    make: "Ford",
    model: "Mustang GT",
    year: 2021,
    price_per_day: 95,
    image_url: "https://example.com/images/ford-mustang.jpg", // Replace with actual image URL
    seats: 4,
    fuel_type: "Petrol",
    transmission: "Manual",
  },
];

const FeaturedCars = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-text text-center mb-10">
        Our Featured Fleet
      </h2>
      <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
        Discover our most popular and exclusive cars, available for a limited
        time.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredCars.map((car) => (
          <CarCard key={car.car_id} car={car} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedCars;
