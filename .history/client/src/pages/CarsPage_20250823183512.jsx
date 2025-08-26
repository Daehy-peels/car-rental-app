// src/pages/CarsPage.jsx
import React, { useState, useEffect } from "react";
import { fetchCars } from "../services/api";
import CarCard from "../components/CarCard";
import CarDetail from "../components/CarDetail";

const CarsPage = ({ onAuthClick, currentUser }) => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    const getCars = async () => {
      setLoading(true);
      const carList = await fetchCars();
      setCars(carList);
      setLoading(false);
    };
    getCars();
  }, []);

  useEffect(() => {
    const filterCars = () => {
      const results = cars.filter(
        (car) =>
          car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCars(results);
    };

    filterCars();
  }, [cars, searchTerm]);

  const handleCardClick = (car) => {
    setSelectedCar(car);
  };

  const handleCloseDetail = () => {
    setSelectedCar(null);
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-gray-500 animate-pulse">Loading cars...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-text mb-6 text-center">
        Explore Our Cars
      </h1>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by make or model..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <CarCard key={car.car_id} car={car} onCardClick={handleCardClick} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">
            No cars found matching your search.
          </p>
        </div>
      )}

      {selectedCar && (
        <CarDetail
          car={selectedCar}
          onClose={handleCloseDetail}
          onAuthClick={onAuthClick}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default CarsPage;
