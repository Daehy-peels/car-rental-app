// src/pages/BookingPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCars, createBooking } from "../services/api";
import { FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import { toast } from "react-toastify";

const BookingPage = ({ currentUser }) => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingDetails, setBookingDetails] = useState({
    startDate: "",
    endDate: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const getCarDetails = async () => {
      try {
        const allCars = await fetchCars();
        const selectedCar = allCars.find((c) => c.car_id === parseInt(carId));
        if (selectedCar) {
          setCar(selectedCar);
        } else {
          toast.error("Car not found.");
          navigate("/");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch car details.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    getCarDetails();
  }, [carId, navigate]);

  useEffect(() => {
    if (car && bookingDetails.startDate && bookingDetails.endDate) {
      const start = new Date(bookingDetails.startDate);
      const end = new Date(bookingDetails.endDate);
      const duration = (end - start) / (1000 * 60 * 60 * 24);
      if (duration > 0) {
        setTotalPrice(duration * car.price_per_day);
      } else {
        setTotalPrice(0);
      }
    }
  }, [car, bookingDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("You must be logged in to book a car.");
      return;
    }
    if (bookingDetails.startDate > bookingDetails.endDate) {
      toast.error("End date cannot be before the start date.");
      return;
    }
    if (totalPrice <= 0) {
      toast.error("Please select valid start and end dates.");
      return;
    }

    try {
      const newBooking = {
        user_id: currentUser.user_id,
        car_id: parseInt(carId),
        start_date: bookingDetails.startDate,
        end_date: bookingDetails.endDate,
      };

      await createBooking(newBooking);
      toast.success(
        "Booking confirmed successfully! Thank you for your order."
      );
      navigate("/");
    } catch (err) {
      // Display the specific error message from the backend
      toast.error(err.message);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading car details...</div>;
  }

  if (!car) {
    return <div className="text-center py-10">Car not found.</div>;
  }

  return (
    <div className="container mx-auto p-8 my-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
        Book Your {car.make} {car.model}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <img
            src={car.image_url}
            alt={`${car.make} ${car.model}`}
            className="w-full h-auto rounded-lg shadow-md"
          />
          <p className="text-xl font-semibold text-primary">
            ${car.price_per_day}
            <span className="text-sm text-gray-500 font-normal"> / day</span>
          </p>
          <p className="text-gray-600">{car.description}</p>
        </div>

        <div className="space-y-6">
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                <FaCalendarAlt className="inline mr-2 text-primary" />
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={bookingDetails.startDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                <FaCalendarAlt className="inline mr-2 text-primary" />
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={bookingDetails.endDate}
                onChange={handleChange}
                min={
                  bookingDetails.startDate ||
                  new Date().toISOString().split("T")[0]
                }
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex items-center justify-between text-2xl font-bold">
              <span className="text-gray-800">Total Price:</span>
              <span className="text-primary">
                <FaDollarSign className="inline mr-1" />
                {totalPrice.toFixed(2)}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-secondary transition-colors duration-300 transform hover:scale-105"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
