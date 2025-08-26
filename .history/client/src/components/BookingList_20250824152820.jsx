// src/components/BookingList.jsx
import React, { useState, useEffect } from "react";
import { fetchBookings, cancelBooking } from "../services/api";
import { FaCalendarCheck, FaBan } from "react-icons/fa";
import { toast } from "react-toastify";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const bookingData = await fetchBookings();
      setBookings(bookingData);
    } catch (err) {
      setError("Failed to fetch bookings.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await cancelBooking(bookingId);
        toast.success("Booking cancelled successfully!");
        getBookings(); // Refresh the list
      } catch (err) {
        toast.error(err.message || "Failed to cancel booking.");
        console.error("Error canceling booking:", err);
      }
    }
  };

  const getBookingStatus = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    if (end < now) {
      return { text: "Completed", color: "text-gray-500" };
    } else {
      return { text: "Active", color: "text-green-500" };
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-gray-500 animate-pulse">
          Loading bookings...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 font-bold">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
        Bookings Management
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booking ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Car
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dates
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.length > 0 ? (
              bookings.map((booking) => {
                const status = getBookingStatus(booking.end_date);
                return (
                  <tr
                    key={booking.booking_id}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.booking_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {booking.username
                        ? `${booking.username} (${booking.email})`
                        : "Deleted User"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {booking.make
                        ? `${booking.make} ${booking.model}`
                        : "Deleted Car"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {new Date(booking.start_date).toLocaleDateString()} to{" "}
                      {new Date(booking.end_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
                      ${parseFloat(booking.total_price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`font-semibold ${status.color}`}>
                        {status.text}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <button
                        onClick={() => handleCancel(booking.booking_id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Cancel Booking"
                      >
                        <FaBan />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;
