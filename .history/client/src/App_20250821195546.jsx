// src/App.jsx
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedCars from "./components/FeaturedCars";
import Testimonials from "./components/Testimonials";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import CarCard from "./components/CarCard";
import CarDetail from "./components/CarDetail";
import "./index.css";
import { fetchCars } from "./services/api";

function App() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    const getCars = async () => {
      const carList = await fetchCars();
      setCars(carList);
    };
    getCars();
  }, []);

  const handleCardClick = (car) => {
    setSelectedCar(car);
  };

  const handleCloseDetail = () => {
    setSelectedCar(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans antialiased">
      <Navbar />
      <Hero />
      <div className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <main className="p-8">
            {/* This section now shows ALL cars */}
            <h2 className="text-4xl font-bold text-text mb-10 text-center animate-fade-in">
              All Cars
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
        </div>

        <FeaturedCars onCardClick={handleCardClick} />
        <Testimonials />
        <CallToAction />
      </div>

      <Footer />

      {/* Conditionally render the CarDetail component */}
      {selectedCar && (
        <CarDetail car={selectedCar} onClose={handleCloseDetail} />
      )}
    </div>
  );
}

export default App;
