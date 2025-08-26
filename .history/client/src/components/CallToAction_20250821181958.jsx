// src/components/CallToAction.jsx
import React from "react";

const CallToAction = () => {
  return (
    <section className="bg-primary text-white py-20 mt-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
          Browse our extensive fleet of cars and find the perfect vehicle for
          your next adventure.
        </p>
        <a
          href="#"
          className="bg-white text-primary font-bold py-3 px-10 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
        >
          Explore Cars Now
        </a>
      </div>
    </section>
  );
};

export default CallToAction;
