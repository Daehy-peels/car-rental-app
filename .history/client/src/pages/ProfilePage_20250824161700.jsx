// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../services/api";
import BookingHistory from "../components/BookingHistory"; // Import the new component
import {
  FaUserCircle,
  FaEnvelope,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";

const ProfilePage = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
  });

  // Redirect if no user is logged in
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    } else {
      setProfileData({
        username: currentUser.username,
        email: currentUser.email,
      });
    }
  }, [currentUser, navigate]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      // You must update your api.js to have this function
      const updatedUser = await updateUserProfile(
        currentUser.user_id,
        profileData
      );
      setCurrentUser(updatedUser); // Update the user state
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!currentUser) {
    return null; // Don't render if user is not logged in
  }

  return (
    <div className="container mx-auto p-8 my-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        User Profile
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-lg h-min">
          <div className="flex flex-col items-center">
            <FaUserCircle className="text-primary text-8xl mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {currentUser.username}
            </h2>
            <p className="text-gray-600 mb-4">{currentUser.email}</p>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-primary text-white rounded-full hover:bg-secondary transition-colors"
            >
              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </button>
          </div>

          {isEditing && (
            <form onSubmit={handleUpdateProfile} className="mt-6 space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={profileData.username}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                Save Changes
              </button>
            </form>
          )}
        </div>

        {/* Bookings Section */}
        <div className="md:col-span-2">
          {/* The BookingHistory component now handles all booking display */}
          <BookingHistory currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
