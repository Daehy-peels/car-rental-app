// src/App.jsx
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CarCard from "./components/CarCard";
import "./index.css";
import { fetchCars } from "./services/api";

function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const getCars = async () => {
      const carList = await fetchCars();
      setCars(carList);
    };
    getCars();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Hero />

      <main className="container mx-auto p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Available Cars
        </h2>

        {cars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <CarCard key={car.car_id} car={car} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            Loading cars or no cars available...
          </p>
        )}
      </main>
    </div>
  );
}

export default App;
