// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import FeaturedCars from "../components/FeaturedCars";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import CarCard from "../components/CarCard";
import CarDetail from "../components/CarDetail";
import { fetchCars } from "../services/api";
import Modal from "../components/Modal"; // We will create this next
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);

  useEffect(() => {
    const getCars = async () => {
      const carList = await fetchCars();
      setCars(carList);
    };
    getCars();
  }, []);

  // Handler for opening Car Detail or Auth Modal
  const handleCardClick = (car) => {
    // For now, we will always show the auth modal
    // In the future, you can check if a user is logged in
    // before showing the CarDetail
    setShowAuthModal(true);
    // setSelectedCar(car); // This line is commented out for now
  };

  const handleCloseDetail = () => {
    setSelectedCar(null);
  };

  const handleOpenAuthModal = () => {
    setShowAuthModal(true);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <main className="p-8">
          <h2 className="text-4xl font-bold text-text mb-10 text-center animate-fade-in">
            Our Premium Fleet
          </h2>
          {cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car) => (
                <CarCard
                  key={car.car_id}
                  car={car}
                  onCardClick={handleCardClick}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-gray-500 animate-pulse">
              Loading cars or no cars available...
            </p>
          )}
        </main>
      </div>
      <FeaturedCars onCardClick={handleCardClick} />
      <Testimonials />
      <CallToAction />

      {/* Conditionally render the CarDetail component */}
      {selectedCar && (
        <CarDetail car={selectedCar} onClose={handleCloseDetail} />
      )}

      {/* New Auth Modal */}
      {showAuthModal && (
        <Modal onClose={handleCloseAuthModal}>
          <div className="max-w-md w-full p-8">
            <h1 className="text-3xl font-bold text-text mb-6 text-center">
              {isLoginView ? "Log In" : "Create an Account"}
            </h1>
            {isLoginView ? <LoginForm /> : <RegisterForm />}
            <div className="text-center mt-6">
              <button
                onClick={() => setIsLoginView(!isLoginView)}
                className="text-primary hover:underline"
              >
                {isLoginView
                  ? "Need an account? Register here."
                  : "Already have an account? Log in here."}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default HomePage;
