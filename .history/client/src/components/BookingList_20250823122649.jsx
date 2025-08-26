// src/components/BookingList.jsx
import React, { useState, useEffect } from "react";
import { fetchBookings } from "../services/api";
import { FaCalendarCheck } from "react-icons/fa";

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
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr
                key={booking.booking_id}
                className="hover:bg-gray-100 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {booking.booking_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {/* Display 'Deleted User' if user is not found */}
                  {booking.username ? `${booking.username} (${booking.email})` : 'Deleted User'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {/* Display 'Deleted Car' if car is not found */}
                  {booking.make ? `${booking.make} ${booking.model}` : 'Deleted Car'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {new Date(booking.start_date).toLocaleDateString()} to{" "}
                  {new Date(booking.end_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
                  ${parseFloat(booking.total_price).toFixed(2)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default BookingList;
