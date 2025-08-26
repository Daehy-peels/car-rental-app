// src/components/Navbar.jsx
import React from "react";
import { FaCarSide } from "react-icons/fa"; // Using react-icons for a car logo

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg animate-fade-in-down">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and App Name */}
        <div className="flex items-center space-x-2">
          <FaCarSide className="text-primary text-3xl" />
          <div className="text-2xl font-bold text-primary tracking-wide">
            CarRentals
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <a
            href="#"
            className="text-gray-600 hover:text-primary transition-colors text-lg font-medium relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-primary transition-colors text-lg font-medium relative group"
          >
            Cars
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </a>
          <a
            href="#"
            className="text-white bg-primary hover:bg-secondary px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
