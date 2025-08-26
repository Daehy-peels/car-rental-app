// src/App.jsx
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CarCard from "./components/CarCard";
import Footer from "./components/Footer";
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
    <div className="bg-background min-h-screen font-sans antialiased">
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <main className="p-8">
          <h2 className="text-4xl font-bold text-text mb-10 text-center">
            Our Premium Fleet
          </h2>

          {cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car) => (
                <CarCard key={car.car_id} car={car} />
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-gray-500">
              Loading cars or no cars available...
            </p>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
