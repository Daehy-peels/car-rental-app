// src/services/api.js

const API_URL = "http://localhost:3000/api";

// Function to fetch all cars from the backend
export const fetchCars = async () => {
  try {
    const response = await fetch(`${API_URL}/cars`);
    if (!response.ok) {
      throw new Error("Failed to fetch cars");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
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

// Function to delete a car
export const deleteCar = async (carId) => {
  try {
    const response = await fetch(`${API_URL}/cars/${carId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete car");
    }
    return true;
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
