// src/components/Hero.jsx
import React from "react";

const Hero = () => {
  return (
    <div className="bg-blue-600 text-white py-20 px-4 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
        Find Your Perfect Ride
      </h1>
      <p className="text-lg sm:text-xl mb-6 max-w-2xl mx-auto">
        Rent the car of your dreams with ease. Affordable prices, great
        selection, and simple booking.
      </p>
      <a
        href="#"
        className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
      >
        Browse Cars
      </a>
    </div>
  );
};

export default Hero;
