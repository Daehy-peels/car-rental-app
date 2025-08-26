// src/pages/CarDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CarDetail from "../components/CarDetail";
import { fetchCarById } from "../services/api";

const CarDetailPage = ({ onAuthClick, currentUser }) => {
  const { carId } = useParams(); // Get the carId from the URL
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCar = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedCar = await fetchCarById(carId);
        if (fetchedCar) {
          setCar(fetchedCar);
        } else {
          setError("Car not found.");
        }
      } catch (err) {
        setError("Failed to fetch car details. Please try again later.");
        console.error("Error fetching car:", err);
      } finally {
        setLoading(false);
      }
    };

    if (carId) {
      getCar();
    }
  }, [carId]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-gray-500 animate-pulse">
          Loading car details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (!car) {
    return null; // or a generic "Car not found" message
  }

  return (
    <div className="container mx-auto py-8">
      {/* Re-use your existing CarDetail component */}
      <CarDetail
        car={car}
        onAuthClick={onAuthClick}
        currentUser={currentUser}
      />
    </div>
  );
};

export default CarDetailPage;
