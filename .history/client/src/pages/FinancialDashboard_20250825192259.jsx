// src/pages/FinancialDashboard.jsx
import React, { useState, useEffect } from "react";
import { FaChartLine, FaDollarSign, FaCar } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
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

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Revenue Chart */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h4 className="text-xl font-bold text-gray-800 mb-4">
            Monthly Revenue
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data?.monthlyRevenue}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) =>
                  typeof value === "number" ? `$${value.toFixed(2)}` : value
                }
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="monthly_revenue"
                stroke="#3b82f6"
                activeDot={{ r: 8 }}
                name="Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Car Popularity Chart */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h4 className="text-xl font-bold text-gray-800 mb-4">
            Top 5 Most Popular Cars
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data?.carPopularity}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="car_name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="booking_count"
                fill="#10b981"
                name="Number of Bookings"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default FinancialDashboard;
