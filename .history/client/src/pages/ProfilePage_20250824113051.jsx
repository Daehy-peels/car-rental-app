// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserBookings, updateUserProfile } from "../services/api";
import { toast } from "react-toastify";
import {
  FaUserCircle,
  FaEnvelope,
  FaCalendarCheck,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";

const ProfilePage = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
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
      fetchBookings();
    }
  }, [currentUser, navigate]);

  const fetchBookings = async () => {
    if (currentUser) {
      try {
        const userBookings = await fetchUserBookings(currentUser.user_id);
        setBookings(userBookings);
      } catch (error) {
        toast.error("Failed to fetch bookings.");
      } finally {
        setLoadingBookings(false);
      }
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
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

  const hasBookings = bookings.length > 0;

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
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FaCalendarCheck className="mr-2 text-primary" />
            My Bookings
          </h2>
          {loadingBookings ? (
            <div className="text-center text-gray-500">Loading bookings...</div>
          ) : hasBookings ? (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div
                  key={booking.booking_id}
                  className="border p-4 rounded-lg flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 transition-transform transform hover:scale-[1.01] hover:shadow-lg"
                >
                  <img
                    src={booking.image_url}
                    alt={`${booking.make} ${booking.model}`}
                    className="w-full md:w-32 h-32 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                      {booking.make} {booking.model}
                    </h3>
                    <p className="text-sm text-gray-600">
                      From: {new Date(booking.start_date).toLocaleDateString()}{" "}
                      to {new Date(booking.end_date).toLocaleDateString()}
                    </p>
                    <p className="text-sm font-bold text-primary">
                      Total: ${parseFloat(booking.total_price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              You don't have any bookings yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
