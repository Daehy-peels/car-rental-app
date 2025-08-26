// src/services/api.js
import { toast } from "react-toastify";
const API_URL = "http://localhost:3000/api";

// Function to fetch all cars from the backend
export const fetchCars = async () => {
  try {
    const response = await fetch(`${API_URL}/cars`);
    if (!response.ok) {
      throw new Error("Failed to fetch cars.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
};

export const fetchCarById = async (carId) => {
  try {
    const response = await fetch(`${API_URL}/cars/${carId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch car details.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching car details:", error);
    return null;
  }
};

// Function to fetch a limited number of cars (e.g., for featured section)
export const fetchFeaturedCars = async (limit = 3) => {
  try {
    const response = await fetch(`${API_URL}/cars`);
    if (!response.ok) {
      throw new Error("Failed to fetch featured cars");
    }
    const data = await response.json();
    return data.slice(0, limit); // Return only the first 'limit' number of cars
  } catch (error) {
    console.error("Error fetching featured cars:", error);
    return [];
  }
};

// Function to create a new car
export const addCar = async (carData) => {
  try {
    const response = await fetch(`${API_URL}/cars`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    });
    if (!response.ok) {
      throw new Error("Failed to add car");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding car:", error);
    throw error;
  }
};

// Function to update a car
export const updateCar = async (carId, carData) => {
  try {
    const response = await fetch(`${API_URL}/cars/${carId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    });
    if (!response.ok) {
      throw new Error("Failed to update car");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating car:", error);
    throw error;
  }
};

// Function to delete a car
export const deleteCar = async (id) => {
  try {
    const response = await fetch(`${API_URL}/cars/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete car");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting car:", error);
    throw error;
  }
};

// Function to fetch all users
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to register.");
    }
    return await response.json();
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Login failed.");
    }
    return await response.json();
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Function to delete a user
export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Function to create a new booking
export const createBooking = async (bookingData) => {
  try {
    const response = await fetch(`${API_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create booking.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

// Function to fetch all bookings for the admin panel
export const fetchBookings = async () => {
  try {
    const response = await fetch(`${API_URL}/bookings`);
    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
};

// Function to fetch all bookings for a specific user
export const fetchUserBookings = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/bookings/user/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user bookings");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return [];
  }
};

// Function to update a user's profile
export const updateUserProfile = async (userId, userData) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to update profile.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

// Function to fetch all bookings for a specific car
export const fetchCarBookings = async (carId) => {
  try {
    const response = await fetch(`${API_URL}/bookings/car/${carId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch car bookings");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching car bookings:", error);
    return [];
  }
};

// Function to cancel a booking by ID
export const cancelBooking = async (bookingId) => {
  try {
    const response = await fetch(`${API_URL}/bookings/${bookingId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to cancel booking.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error canceling booking:", error);
    throw error;
  }
};

// --- Reviews API calls ---
export const fetchCarReviews = async (carId) => {
  try {
    const response = await fetch(`${API_URL}/reviews/car/${carId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch car reviews.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};

export const getCarAverageRating = async (carId) => {
  try {
    const response = await fetch(
      `${API_URL}/reviews/car/${carId}/average-rating`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch average rating.");
    }
    const data = await response.json();
    return data.average_rating;
  } catch (error) {
    console.error("Error fetching average rating:", error);
    return "0.0";
  }
};

export const submitReview = async (reviewData) => {
  try {
    const response = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to submit review.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
};

export const fetchAdminDashboardData = async () => {
  try {
    const [
      revenueRes,
      bookingsRes,
      popularCarRes,
      monthlyRevenueRes,
      carPopularityRes,
      revenueByCarTypeRes, // New API call
    ] = await Promise.all([
      fetch(`${API_URL}/total_revenue`),
      fetch(`${API_BASE_URL}/total_bookings`),
      fetch(`${API_BASE_URL}/most_popular_car`),
      fetch(`${API_BASE_URL}/monthly_revenue`),
      fetch(`${API_BASE_URL}/car_popularity`),
      fetch(`${API_BASE_URL}/revenue_by_car_type`), // New fetch
    ]);

    const totalRevenue = await revenueRes.json();
    const totalBookings = await bookingsRes.json();
    const mostPopularCar = await popularCarRes.json();
    const monthlyRevenue = await monthlyRevenueRes.json();
    const carPopularity = await carPopularityRes.json();
    const revenueByCarType = await revenueByCarTypeRes.json(); // Get the new data

    return {
      totalRevenue: totalRevenue.sum,
      totalBookings: totalBookings.count,
      mostPopularCar: mostPopularCar.car_name,
      monthlyRevenue,
      carPopularity,
      revenueByCarType, // Return the new data to the component
    };
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    throw error;
  }
};
