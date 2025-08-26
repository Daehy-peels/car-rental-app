// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/AdminDashboard";
import BookingPage from "./pages/BookingPage";
import CarsPage from "./pages/CarsPage";
import ProfilePage from "./pages/ProfilePage";
import BookingDetailPage from "./pages/BookingDetailPage";
import CarDetailPage from "./pages/CarDetailPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import mainCarImage from "./assets/hero.jpg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  ); // Read from local storage
  const location = useLocation();

  const handleOpenAuthModal = () => {
    setShowAuthModal(true);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleLoginSuccess = (response) => {
    // The response object contains both 'token' and 'user'
    localStorage.setItem("token", response.token); // Store the token
    localStorage.setItem("currentUser", JSON.stringify(response.user)); // Store user data
    setCurrentUser(response.user);
    setShowAuthModal(false);
  };

  const handleRegistrationSuccess = (user) => {
    setIsLoginView(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Conditionally render the correct Navbar */}
      {/* You had an AdminNavbar component imported, but not used. The regular Navbar handles the logic just fine. */}
      <Navbar
        onAuthClick={handleOpenAuthModal}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <div className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onAuthClick={handleOpenAuthModal}
                currentUser={currentUser}
              />
            }
          />
          <Route
            path="/cars"
            element={
              <CarsPage
                onAuthClick={handleOpenAuthModal}
                currentUser={currentUser}
              />
            }
          />
          <Route
            path="/cars/:carId"
            element={
              <CarDetailPage
                onAuthClick={handleOpenAuthModal}
                currentUser={currentUser}
              />
            }
          />
          <Route
            path="/book/:carId"
            element={<BookingPage currentUser={currentUser} />}
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
          <Route
            path="/profile/bookings/:bookingId"
            element={<BookingDetailPage currentUser={currentUser} />}
          />
          {/* Protected Admin Route */}
          <Route
            path="/admin"
            element={
              currentUser && currentUser.is_admin ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      <Footer />
      {showAuthModal && (
        <Modal onClose={handleCloseAuthModal}>
          <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden">
            <div className="p-8 md:p-10 w-full md:w-1/2 flex items-center justify-center">
              <div className="max-w-md mx-auto">
                <h1 className="text-3xl font-bold text-text mb-6 text-center">
                  {isLoginView ? "Log In" : "Create an Account"}
                </h1>
                {isLoginView ? (
                  <LoginForm onLoginSuccess={handleLoginSuccess} />
                ) : (
                  <RegisterForm
                    onRegistrationSuccess={() => setIsLoginView(true)}
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
            {/* ... (image div remains the same) */}
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
