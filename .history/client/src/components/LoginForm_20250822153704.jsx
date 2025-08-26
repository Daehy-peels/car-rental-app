// src/components/LoginForm.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";

const LoginForm = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const user = await response.json();
        toast.success("Login successful!"); // Changed from alert()
        onLoginSuccess(user);
      } else {
        const errorData = await response.json();
        toast.error(`Login failed: ${errorData.error}`); // Changed from alert()
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again."); // Changed from alert()
    }
  };

  return (
    <div className="p-8 md:p-10 rounded-xl shadow-lg bg-white max-w-sm mx-auto w-full">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        Welcome Back!
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your-email@example.com"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-secondary transition-all duration-300 shadow-lg transform hover:scale-105"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
