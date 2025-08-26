// src/components/Navbar.jsx
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">CarRentals</div>
        <div className="flex items-center space-x-6">
          <a
            href="#"
            className="text-gray-600 hover:text-primary transition-colors text-lg font-medium"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-primary transition-colors text-lg font-medium"
          >
            Cars
          </a>
          <a
            href="#"
            className="text-white bg-primary hover:bg-secondary px-6 py-2 rounded-full font-semibold transition-colors shadow-md"
          >
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
