// src/pages/CarsPage.jsx
import React, { useState, useEffect } from "react";
import { fetchCars } from "../services/api";
import CarCard from "../components/CarCard";
import CarDetail from "../components/CarDetail";
import { FaSearch, FaDollarSign, FaUsers } from "react-icons/fa";

const CarsPage = ({ onAuthClick, currentUser }) => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");

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
    const applyFilters = () => {
      let results = cars.filter((car) => {
        // Search filter
        const matchesSearch =
          car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.model.toLowerCase().includes(searchTerm.toLowerCase());

        // Price filter
        const matchesPrice =
          (minPrice === "" || car.price_per_day >= parseFloat(minPrice)) &&
          (maxPrice === "" || car.price_per_day <= parseFloat(maxPrice));

        // Seating capacity filter
        const matchesSeats =
          seatingCapacity === "" || car.seats === parseInt(seatingCapacity);

        return matchesSearch && matchesPrice && matchesSeats;
      });
      setFilteredCars(results);
    };

    applyFilters();
  }, [cars, searchTerm, minPrice, maxPrice, seatingCapacity]);

  const handleCardClick = (car) => {
    setSelectedCar(car);
  };

  const handleCloseDetail = () => {
    setSelectedCar(null);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setSeatingCapacity("");
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

      {/* Filter and Search Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Search Input */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              <FaSearch className="inline mr-2 text-primary" />
              Search
            </label>
            <input
              type="text"
              placeholder="Search by make or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Price Range */}
          <div className="col-span-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              <FaDollarSign className="inline mr-2 text-primary" />
              Price Range
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Seating Capacity */}
          <div className="col-span-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              <FaUsers className="inline mr-2 text-primary" />
              Seats
            </label>
            <select
              value={seatingCapacity}
              onChange={(e) => setSeatingCapacity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="7">7</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleClearFilters}
          className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          Clear Filters
        </button>
      </div>

      {/* Car List */}
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <CarCard key={car.car_id} car={car} onCardClick={handleCardClick} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">
            No cars found matching your criteria.
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
