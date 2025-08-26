// src/components/Navbar.jsx
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800">CarRentals</div>
        <div className="space-x-4">
          <a
            href="#"
            className="text-gray-600 hover:text-blue-500 transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-blue-500 transition-colors"
          >
            Cars
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-blue-500 transition-colors"
          >
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
