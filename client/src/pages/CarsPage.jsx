// src/pages/CarsPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { fetchCars } from "../services/api";
import CarCard from "../components/CarCard";
import { FaSearch, FaDollarSign, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CarsPage = ({ onAuthClick, currentUser }) => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");

  useEffect(() => {
    const getCars = async () => {
      setLoading(true);
      const carList = await fetchCars();
      setCars(carList);
      setLoading(false);
    };
    getCars();
  }, []);

  // Use useMemo to optimize filtering
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesSearch =
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice =
        (!minPrice || car.price_per_day >= parseFloat(minPrice)) &&
        (!maxPrice || car.price_per_day <= parseFloat(maxPrice));
      const matchesSeating =
        !seatingCapacity || car.seats === parseInt(seatingCapacity);
      return matchesSearch && matchesPrice && matchesSeating;
    });
  }, [cars, searchTerm, minPrice, maxPrice, seatingCapacity]); // Recalculate only when these dependencies change

  const handleCardClick = (car) => {
    navigate(`/cars/${car.car_id}`);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setSeatingCapacity("");
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-500 animate-pulse">Loading cars...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Find Your Perfect Ride
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Search
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by make or model"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="min-price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Min Price
            </label>
            <input
              type="number"
              id="min-price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min price"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="max-price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Max Price
            </label>
            <input
              type="number"
              id="max-price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max price"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="seating-capacity"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Seats
            </label>
            <select
              id="seating-capacity"
              value={seatingCapacity}
              onChange={(e) => setSeatingCapacity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="7">7+</option>
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
    </div>
  );
};

export default CarsPage;
