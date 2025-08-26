// src/components/Hero.jsx
import React from "react";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-white py-24 px-4 text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
        Your Next Adventure Starts Here.
      </h1>
      <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
        Find and book the perfect car for your journey with ease.
      </p>
      <div className="flex justify-center">
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
