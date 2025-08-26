// src/AddCarForm.jsx
import React, { useState } from "react";
import { addCar } from "../services/api";
import { toast } from "react-toastify";

const AddCarForm = () => {
  // State to hold the form data
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    price_per_day: "",
    description: "",
    image_url: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCar(formData);
      toast.success("Car added successfully!"); // Changed from alert()
      setFormData({
        make: "",
        model: "",
        year: "",
        price_per_day: "",
        image_url: "",
      });
    } catch (error) {
      console.error("Error adding car:", error);
      toast.error("Failed to add car. Please try again."); // Changed from alert()
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Add New Car</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="make"
          value={formData.make}
          onChange={handleChange}
          placeholder="Make"
          required
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          placeholder="Model"
          required
          className="p-2 border border-gray-300 rounded-md"
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
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="p-2 border border-gray-300 rounded-md"
        ></textarea>
        <input
          type="text"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          placeholder="Image URL"
          className="p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCarForm;
