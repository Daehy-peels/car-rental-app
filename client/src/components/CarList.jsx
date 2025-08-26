// src/components/CarList.jsx
import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrash,
  FaCarSide,
  FaTimes,
  FaUsers,
  FaGasPump,
  FaCog,
  FaCar,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { fetchCars, deleteCar, updateCar } from "../services/api";
import { toast } from "react-toastify";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // State to hold the car being edited
  const [editingCar, setEditingCar] = useState(null);

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
        toast.success("Car deleted successfully!");
        getCars();
      } catch (err) {
        toast.error("Failed to delete the car.");
      }
    }
  };

  const handleEditClick = (car) => {
    setEditingCar(car);
  };

  const handleCancelEdit = () => {
    setEditingCar(null);
  };

  const handleUpdate = async (updatedData) => {
    try {
      await updateCar(editingCar.car_id, updatedData);
      toast.success("Car updated successfully!");
      setEditingCar(null);
      getCars();
    } catch (err) {
      toast.error("Failed to update car.");
    }
  };

  const CarEditForm = ({ car, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState(car);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onUpdate(formData);
    };

    return (
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-primary">
            Editing Car: {car.make} {car.model}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-red-600 transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key) => {
            if (key === "car_id" || key === "is_available") return null; // Exclude these fields from the form

            return (
              <div key={key}>
                <label
                  htmlFor={key}
                  className="block text-sm font-medium text-gray-700 capitalize"
                >
                  {key.replace("_", " ")}
                </label>
                <input
                  type={
                    key === "price_per_day" || key === "year" || key === "seats"
                      ? "number"
                      : "text"
                  }
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                />
              </div>
            );
          })}
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-secondary transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    );
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
    <div>
      {editingCar ? (
        <CarEditForm
          car={editingCar}
          onUpdate={handleUpdate}
          onCancel={handleCancelEdit}
        />
      ) : (
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
                    Seats
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transmission
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fuel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {car.seats}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {car.transmission}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {car.fuel_type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {car.car_type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {car.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleEditClick(car)}
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
                    <td colSpan="9" className="text-center py-4 text-gray-500">
                      No cars found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarList;
