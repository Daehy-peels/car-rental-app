// src/components/AdminRoute.jsx

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  // Get user data from local storage
  const user = JSON.parse(localStorage.getItem("user"));

  // Check if user is logged in and if they have admin privileges
  const isAuthenticated = !!user;
  const isAdmin = user?.is_admin;

  if (!isAuthenticated || !isAdmin) {
    // Redirect to the login page or homepage if not an authenticated admin
    return <Navigate to="/" />; // You might want to redirect to a specific login page
  }

  // If the user is an admin, render the nested routes
  return <Outlet />;
};

export default AdminRoute;
