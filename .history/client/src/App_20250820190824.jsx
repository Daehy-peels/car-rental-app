// src/App.jsx
import { useState, useEffect } from "react";
import AddCarForm from "./AddCarForm";
import "./index.css";

function App() {
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/cars");
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Car Rental Dashboard
        </h1>

        <div className="mb-10">
          <AddCarForm />
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
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Status:</span>{" "}
                  {car.is_available ? "Available" : "Rented"}
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
