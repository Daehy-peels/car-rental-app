// src/components/Navbar.jsx
import React, { useState } from "react";
import { FaCarSide, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ onAuthClick, currentUser, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 bg-white shadow-lg animate-fade-in-down z-50">
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
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-gray-600 hover:text-primary transition-colors text-lg font-medium relative group ${
                isActive ? "font-bold text-primary" : ""
              }`
            }
          >
            Home
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
            ></span>
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
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
            ></span>
          </NavLink>
          {currentUser && (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `text-gray-600 hover:text-primary transition-colors text-lg font-medium relative group ${
                  isActive ? "font-bold text-primary" : ""
                }`
              }
            >
              My Profile
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
              ></span>
            </NavLink>
          )}
          {/* Admin link */}
          {currentUser?.is_admin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `text-gray-600 hover:text-primary transition-colors text-lg font-medium relative group ${
                  isActive ? "font-bold text-primary" : ""
                }`
              }
            >
              Admin
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
              ></span>
            </NavLink>
          )}
        </div>

        {/* User Auth/Profile section (desktop) */}
        <div className="hidden md:flex items-center">
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-text">
                Hi, {currentUser.username}
              </span>
              <button
                onClick={onLogout}
                className="bg-red-500 text-white hover:bg-red-600 px-6 py-2 rounded-full font-semibold transition-colors shadow-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onAuthClick}
              className="bg-primary text-white hover:bg-secondary px-6 py-2 rounded-full font-semibold transition-colors shadow-md"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? (
              <FaTimes className="text-gray-600 text-2xl" />
            ) : (
              <FaBars className="text-gray-600 text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 px-6 absolute top-full left-0 w-full animate-slide-down">
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
