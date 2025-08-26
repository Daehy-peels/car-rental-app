// src/AddCarForm.jsx
import React, { useState } from "react";
import { addCar } from "../services/api";
import { toast } from "react-toastify";

const AddCarForm = () => {
  // State to hold the form data with new fields
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    price_per_day: "",
    description: "",
    image_url: "",
    seats: "", // New field
    transmission: "Automatic", // New field with a default
    fuel_type: "", // New field
    car_type: "", // New field
    location: "", // New field
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCar(formData);
      toast.success("Car added successfully!");
      // Reset form data after successful submission
      setFormData({
        make: "",
        model: "",
        year: "",
        price_per_day: "",
        description: "",
        image_url: "",
        seats: "",
        transmission: "Automatic",
        fuel_type: "",
        car_type: "",
        location: "",
      });
    } catch (error) {
      console.error("Error adding car:", error);
      toast.error("Failed to add car. Please try again.");
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Add New Car</h2>
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          name="make"
          value={formData.make}
          onChange={handleChange}
          placeholder="Make"
          required
          className="p-2 border border-gray-300 rounded-md col-span-1"
        />
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          placeholder="Model"
          required
          className="p-2 border border-gray-300 rounded-md col-span-1"
        />
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="Year"
          required
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="price_per_day"
          value={formData.price_per_day}
          onChange={handleChange}
          placeholder="Price per Day"
          required
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="seats"
          value={formData.seats}
          onChange={handleChange}
          placeholder="Number of Seats"
          required
          className="p-2 border border-gray-300 rounded-md"
        />
        <div className="col-span-1">
          <select
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>
        <input
          type="text"
          name="fuel_type"
          value={formData.fuel_type}
          onChange={handleChange}
          placeholder="Fuel Type (e.g., Petrol, Electric)"
          required
          className="p-2 border border-gray-300 rounded-md col-span-1"
        />
        <input
          type="text"
          name="car_type"
          value={formData.car_type}
          onChange={handleChange}
          placeholder="Car Type (e.g., Sedan, SUV)"
          required
          className="p-2 border border-gray-300 rounded-md col-span-1"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location (e.g., City, State)"
          required
          className="p-2 border border-gray-300 rounded-md col-span-2"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="p-2 border border-gray-300 rounded-md col-span-2"
        ></textarea>
        <input
          type="text"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          placeholder="Image URL"
          className="p-2 border border-gray-300 rounded-md col-span-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors col-span-2"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCarForm;