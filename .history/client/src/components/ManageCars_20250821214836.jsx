// src/components/ManageCars.jsx
import React, { useState, useEffect } from 'react';
import { fetchCars, deleteCar } from '../services/api';
import { FaTrash, FaEdit } from 'react-icons/fa';

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch all cars from the API
  const getCars = async () => {
    setLoading(true);
    const carList = await fetchCars();
    setCars(carList);
    setLoading(false);
  };

  // Function to handle car deletion
  const handleDelete = async (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await deleteCar(carId);
        // Refresh the list after successful deletion
        getCars();
        alert('Car deleted successfully!');
      } catch (error) {
        console.error('Error deleting car:', error);
        alert('Failed to delete car.');
      }
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading cars...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Manage Cars</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Make</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Model</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Year</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Price / Day</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.car_id} className="border-b last:border-b-0">
                <td className="py-3 px-4 text-sm text-gray-600">{car.make}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{car.model}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{car.year}</td>
                <td className="py-3 px-4 text-sm text-gray-600">${car.price_per_day}</td>
                <td className="py-3 px-4 text-sm text-gray-600 flex space-x-2">
                  <button
                    onClick={() => alert(`Edit car with ID: ${car.car_id}`)} // Placeholder for the edit functionality
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(car.car_id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCars;