// src/components/Navbar.jsx
import React, { useState } from "react";
import { FaCarSide, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ onAuthClick, currentUser, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg animate-fade-in-down z-50 relative">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and App Name */}
        <div className="flex items-center space-x-2">
          <FaCarSide className="text-primary text-3xl" />
          <div className="text-2xl font-bold text-primary tracking-wide">
            CarRentals
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-primary transition-colors text-lg font-medium relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
          <a
            href="#"
            className="text-gray-600 hover:text-primary transition-colors text-lg font-medium relative group"
          >
            Cars
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>

          {/* Conditional rendering based on user login status */}
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-text">
                Hi, {currentUser.username}
              </span>
              {/* Attach the onLogout handler here */}
              <button
                onClick={onLogout}
                className="bg-red-500 text-white hover:bg-red-600 px-6 py-2 rounded-full font-semibold transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
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
            >
              Home
            </Link>
            <a
              href="#"
              className="block text-gray-600 hover:text-primary transition-colors text-lg font-medium w-full text-center py-2"
            >
              Cars
            </a>
            {currentUser ? (
              <div className="flex flex-col items-center space-y-2 w-full">
                <span className="text-lg font-semibold text-text">
                  Hi, {currentUser.username}
                </span>
                {/* Attach the onLogout handler here */}
                <button
                  onClick={onLogout}
                  className="bg-red-500 text-white hover:bg-red-600 px-6 py-2 rounded-full font-semibold transition-colors w-1/2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
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
