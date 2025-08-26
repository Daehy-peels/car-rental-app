// src/components/Hero.jsx
import React from "react";
import mainCarImage from "../assets/main_car.png";

const Hero = () => {
  return (
    <div
      className="relative h-[50vh] md:h-[60vh] bg-cover bg-center flex items-center justify-center text-center"
      style={{ backgroundImage: `url(${mainCarImage})` }}
    >
      {/* Semi-transparent overlay with a subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30"></div>

      {/* Content */}
      <div className="relative z-10 text-white p-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          Your Next Adventure Starts Here.
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Find and book the perfect car for your journey with ease.
        </p>
        <a
          href="#"
          className="bg-white text-primary font-bold py-3 px-10 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
        >
          Browse Our Fleet
        </a>
      </div>
    </div>
  );
};

export default Hero;
