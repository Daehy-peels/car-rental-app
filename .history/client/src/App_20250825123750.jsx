// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/AdminDashboard";
import BookingPage from "./pages/BookingPage";
import CarsPage from "./pages/CarsPage";
import ProfilePage from "./pages/ProfilePage";
import BookingDetailPage from "./pages/BookingDetailPage";
import CarDetailPage from "./pages/CarDetailPage";
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import mainCarImage from "./assets/hero.jpg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
// Import admin-specific components
import CarList from "./components/CarList";
import UserList from "./components/UserList";
import AddCarForm from "./components/AddCarForm";
import BookingList from "./components/BookingList";

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

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

  const handleRegistrationSuccess = (user) => {
    setIsLoginView(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {isAdminRoute ? (
        <AdminNavbar currentUser={currentUser} onLogout={handleLogout} />
      ) : (
        <Navbar
          onAuthClick={handleOpenAuthModal}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}
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
          {/* Admin Routes with nested structure */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<CarList />} />{" "}
            {/* Default content for /admin */}
            <Route path="cars" element={<CarList />} />
            <Route path="add-car" element={<AddCarForm />} />
            <Route path="users" element={<UserList />} />
            <Route path="bookings" element={<BookingList />} />
          </Route>
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
