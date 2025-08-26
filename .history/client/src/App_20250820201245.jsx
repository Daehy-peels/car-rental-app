// src/App.jsx
import { useState, useEffect } from "react";
import "./index.css";
import { fetchCars, addCar } from "./services/api";

function App() {
  const [cars, setCars] = useState([]);

  // Use the fetchCars service function
  const getCars = async () => {
    const carList = await fetchCars();
    setCars(carList);
  };

  useEffect(() => {
    getCars();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // This is a placeholder for your form data
    const newCarData = {
      make: "New Make",
      model: "New Model",
      year: 2023,
      price_per_day: 65,
      description: "A new car added from the frontend.",
      image_url: "https://placehold.co/600x400/png",
    };

    try {
      await addCar(newCarData);
      // Refresh the car list after adding a new car
      getCars();
      alert("Car added successfully!");
    } catch (error) {
      alert("Failed to add car. Check console for details.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Car Rental Dashboard
        </h1>

        <div className="mb-10 text-center">
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition-colors"
          >
            Add Example Car
          </button>
        </div>

        <hr className="my-8 border-gray-300" />

        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
          Available Cars
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car.car_id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={car.image_url}
                alt={`${car.make} ${car.model}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {car.make} {car.model}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Year:</span> {car.year}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Price:</span> $
                  {car.price_per_day} / day
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
