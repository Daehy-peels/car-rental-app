// src/components/Navbar.jsx
import React, { useState } from "react";
import { FaCarSide, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom"; // Add NavLink for active styling

const Navbar = ({ onAuthClick, currentUser, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg animate-fade-in-down z-50 relative">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* ... (existing logo and links) */}

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-gray-600 hover:text-primary transition-colors text-lg font-medium relative group ${
                isActive ? "font-bold text-primary" : ""
              }`
            }
          >
            Home
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </NavLink>
          <NavLink
            to="/cars"
            className={({ isActive }) =>
              `text-gray-600 hover:text-primary transition-colors text-lg font-medium relative group ${
                isActive ? "font-bold text-primary" : ""
              }`
            }
          >
            Cars
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </NavLink>
          {/* Add this new link */}
          {currentUser && (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `text-gray-600 hover:text-primary transition-colors text-lg font-medium relative group ${
                  isActive ? "font-bold text-primary" : ""
                }`
              }
            >
              Profile
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </NavLink>
          )}

          {/* Conditional rendering based on user login status */}
          {currentUser ? (
            // ... (existing user section)
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-text">
                Hi, {currentUser.username}
              </span>
              <button
                onClick={onLogout}
                className="bg-red-500 text-white hover:bg-red-600 px-6 py-2 rounded-full font-semibold transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            // ... (existing login button)
            <button
              onClick={onAuthClick}
              className="bg-primary text-white hover:bg-secondary px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-600 focus:outline-none"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu content */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 transition-all duration-300 ease-in-out">
          <div className="flex flex-col items-center space-y-4">
            <Link
              to="/"
              className="block text-gray-600 hover:text-primary transition-colors text-lg font-medium w-full text-center py-2"
              onClick={toggleMenu} // Close menu on click
            >
              Home
            </Link>
            <Link
              to="/cars"
              className="block text-gray-600 hover:text-primary transition-colors text-lg font-medium w-full text-center py-2"
              onClick={toggleMenu} // Close menu on click
            >
              Cars
            </Link>
            {currentUser ? (
              <div className="flex flex-col items-center space-y-2 w-full">
                <span className="text-lg font-semibold text-text">
                  Hi, {currentUser.username}
                </span>
                <button
                  onClick={() => {
                    onLogout();
                    toggleMenu();
                  }}
                  className="bg-red-500 text-white hover:bg-red-600 px-6 py-2 rounded-full font-semibold transition-colors w-1/2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onAuthClick();
                  toggleMenu();
                }}
                className="block w-full text-center"
              >
                <span className="bg-primary text-white hover:bg-secondary px-6 py-2 rounded-full font-semibold transition-colors w-1/2">
                  Login
                </span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
