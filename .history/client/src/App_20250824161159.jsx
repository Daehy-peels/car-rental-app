// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/AdminDashboard";
import CarsPage from "./pages/CarsPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // Load user from local storage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleOpenAuthModal = () => {
    setShowAuthModal(true);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setShowAuthModal(false);
  };

  const handleRegistrationSuccess = () => {
    setIsLoginView(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans antialiased">
      <Navbar
        onAuthClick={handleOpenAuthModal}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route
            path="/admin"
            element={<AdminDashboard currentUser={currentUser} />}
          />
          <Route
            path="/profile"
            element={
              <ProfilePage
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
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
                src="./src/assets/hero.jpg"
                alt="A stylish car"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </Modal>
      )}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
