// src/App.jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import "./index.css";

function App() {
  // State to manage the visibility of the auth modal
  const [showAuthModal, setShowAuthModal] = useState(false);
  // State to switch between login and register views in the modal
  const [isLoginView, setIsLoginView] = useState(true);

  // Functions to open and close the auth modal
  const handleOpenAuthModal = () => {
    setShowAuthModal(true);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans antialiased">
      {/* Pass the handler to the Navbar */}
      <Navbar onAuthClick={handleOpenAuthModal} />

      <div className="flex-grow">
        <Routes>
          {/* Pass the handler to the HomePage */}
          <Route path="/" element={<HomePage onAuthClick={handleOpenAuthModal} />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
      <Footer />

      {/* Conditionally render the Auth Modal based on state */}
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
    </div>
  );
}

export default App;