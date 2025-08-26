// src/pages/BookingDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserBookings, cancelBooking } from "../services/api";
import { toast } from "react-toastify";
import {
  FaCalendarCheck,
  FaDollarSign,
  FaTrashAlt,
  FaArrowLeft,
} from "react-icons/fa";

const BookingDetailPage = ({ currentUser }) => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBookingDetails = async () => {
      if (!currentUser) {
        navigate("/");
        return;
      }

      try {
        setLoading(true);
        // Fetch all user bookings and find the one that matches the ID
        const userBookings = await fetchUserBookings(currentUser.user_id);
        const foundBooking = userBookings.find(
          (b) => b.booking_id === parseInt(bookingId)
        );

        if (foundBooking) {
          setBooking(foundBooking);
        } else {
          toast.error("Booking not found.");
          navigate("/profile");
        }
      } catch (err) {
        toast.error("Failed to fetch booking details.");
        navigate("/profile");
      } finally {
        setLoading(false);
      }
    };

    getBookingDetails();
  }, [bookingId, currentUser, navigate]);

  const handleCancel = async () => {
    if (
      window.confirm(
        "Are you sure you want to cancel this booking? This action cannot be undone."
      )
    ) {
      try {
        await cancelBooking(booking.booking_id);
        toast.success("Booking cancelled successfully.");
        navigate("/profile"); // Redirect back to profile page after cancellation
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading booking details...</div>;
  }

  if (!booking) {
    return <div className="text-center py-10">Booking not found.</div>;
  }

  return (
    <div className="container mx-auto p-8 my-10 bg-white shadow-lg rounded-lg max-w-2xl">
      <button
        onClick={() => navigate(-1)}
        className="text-gray-600 hover:text-primary transition-colors flex items-center mb-6"
      >
        <FaArrowLeft className="mr-2" /> Back to Profile
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
        Booking Details
      </h1>

      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
        <img
          src={booking.image_url}
          alt={`${booking.make} ${booking.model}`}
          className="w-full md:w-56 h-auto rounded-lg shadow-md"
        />
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            {booking.make} {booking.model}
          </h2>
          <div className="text-gray-600">
            <FaCalendarCheck className="inline mr-2 text-primary" />
            <span className="font-semibold">Dates:</span>{" "}
            {new Date(booking.start_date).toLocaleDateString()} to{" "}
            {new Date(booking.end_date).toLocaleDateString()}
          </div>
          <div className="text-gray-600">
            <FaDollarSign className="inline mr-2 text-primary" />
            <span className="font-semibold">Total Price:</span>{" "}
            <span className="text-primary font-bold">
              ${parseFloat(booking.total_price).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleCancel}
          className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition-colors duration-300 transform hover:scale-105 flex items-center justify-center"
        >
          <FaTrashAlt className="mr-2" /> Cancel Booking
        </button>
      </div>
    </div>
  );
};

export default BookingDetailPage;
