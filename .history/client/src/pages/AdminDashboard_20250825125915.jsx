// src/pages/FinancialDashboard.jsx
import React, { useState, useEffect } from "react";
import { FaChartLine, FaDollarSign, FaCar } from "react-icons/fa";
import { fetchAdminDashboardData } from "../services/api";

const FinancialDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        setLoading(true);
        const fetchedData = await fetchAdminDashboardData();
        setData(fetchedData);
        setError(null);
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    getDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 bg-white rounded-lg shadow-lg text-center">
        <p className="text-gray-500 animate-pulse">Loading financial data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-white rounded-lg shadow-lg text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Financial & Reporting
      </h2>
      <p className="text-gray-600 mb-8">
        An overview of your rental business's financial performance.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Revenue Card */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="bg-green-500 text-white p-3 rounded-full">
            <FaDollarSign className="text-2xl" />
          </div>
          <div>
            <p className="text-gray-500 font-semibold">Total Revenue</p>
            <h3 className="text-3xl font-bold text-gray-900">
              ${data?.totalRevenue?.toFixed(2) || "0.00"}
            </h3>
          </div>
        </div>

        {/* Total Bookings Card */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="bg-blue-500 text-white p-3 rounded-full">
            <FaChartLine className="text-2xl" />
          </div>
          <div>
            <p className="text-gray-500 font-semibold">Total Bookings</p>
            <h3 className="text-3xl font-bold text-gray-900">
              {data?.totalBookings || "0"}
            </h3>
          </div>
        </div>

        {/* Most Popular Car Card */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="bg-yellow-500 text-white p-3 rounded-full">
            <FaCar className="text-2xl" />
          </div>
          <div>
            <p className="text-gray-500 font-semibold">Most Popular Car</p>
            <h3 className="text-xl font-bold text-gray-900">
              {data?.mostPopularCar || "N/A"}
            </h3>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <p className="text-center text-gray-500 italic">
          More detailed charts and reports will be added here soon.
        </p>
      </div>
    </div>
  );
};

export default FinancialDashboard;