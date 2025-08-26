// src/App.jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import mainCarImage from "./assets/hero.jpg";
import "./index.css";

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  // New state to store user information
  const [currentUser, setCurrentUser] = useState(null);

  const handleOpenAuthModal = () => {
    setShowAuthModal(true);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setShowAuthModal(false); // Close the modal on success
    alert(`Welcome back, ${user.username}!`);
  };

  const handleRegistrationSuccess = (user) => {
    alert(`Account created for ${user.username}! You can now log in.`);
    setIsLoginView(true); // Switch to login form
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans antialiased">
      {/* Pass currentUser and onAuthClick to Navbar */}
      <Navbar onAuthClick={handleOpenAuthModal} currentUser={currentUser} />

      <div className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={<HomePage onAuthClick={handleOpenAuthModal} />}
          />
          {/* We will add Admin Dashboard and other routes later */}
        </Routes>
      </div>
      <Footer />

      {showAuthModal && (
        <Modal onClose={handleCloseAuthModal}>
          <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden max-w-4xl mx-auto shadow-2xl">
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <div className="max-w-md mx-auto">
                <h1 className="text-3xl font-bold text-text mb-6 text-center">
                  {isLoginView ? "Log In" : "Create an Account"}
                </h1>
                {isLoginView ? (
                  <LoginForm onLoginSuccess={handleLoginSuccess} />
                ) : (
                  <RegisterForm
                    onRegistrationSuccess={handleRegistrationSuccess}
                  />
                )}
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
            </div>

            <div className="hidden md:block md:w-1/2">
              <img
                src={mainCarImage}
                alt="A stylish car"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
