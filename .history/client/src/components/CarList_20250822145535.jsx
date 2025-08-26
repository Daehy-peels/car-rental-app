// src/components/CarList.jsx
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaCarSide } from "react-icons/fa";
import { fetchCars, deleteCar } from "../services/api";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCars();
  }, []);

  const getCars = async () => {
    setLoading(true);
    setError(null);
    try {
      const carsData = await fetchCars();
      setCars(carsData);
    } catch (err) {
      setError("Failed to fetch cars.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (carId) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await deleteCar(carId);
        alert("Car deleted successfully!");
        getCars(); // Refresh the list
      } catch (err) {
        alert("Failed to delete the car.");
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-gray-500 animate-pulse">Loading cars...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 font-bold">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
        Car Management
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Car
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price/Day
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cars.length > 0 ? (
              cars.map((car) => (
                <tr
                  key={car.car_id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {car.car_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div className="flex items-center">
                      <FaCarSide className="text-primary mr-2" />
                      {car.make} {car.model}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    ${car.price_per_day}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-900 transition-colors transform hover:scale-110"
                      title="Edit Car"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(car.car_id)}
                      className="text-red-600 hover:text-red-900 transition-colors transform hover:scale-110"
                      title="Delete Car"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No cars found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarList;
