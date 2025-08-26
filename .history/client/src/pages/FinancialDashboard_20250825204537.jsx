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
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { fetchAdminDashboardData } from "../services/api";

// Custom Tooltip Component for the Line Chart
const CustomLineTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const value = Number(payload[0].value);

    return (
      <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-xl">
        <p className="font-semibold text-gray-800">{`Month: ${label}`}</p>
        <p className="text-blue-500 mt-1">{`${
          payload[0].name
        }: $${value.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};

// Custom Tooltip Component for the Bar Chart
const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-xl">
        <p className="font-semibold text-gray-800">{`Car: ${label}`}</p>
        <p className="text-teal-500 mt-1">{`${payload[0].name}: ${payload[0].value} bookings`}</p>
      </div>
    );
  }
  return null;
};

const FinancialDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Custom colors for the BarChart bars
  const barColors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

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
      <div className="p-8 bg-white rounded-lg shadow-lg text-center min-h-screen flex items-center justify-center">
        <p className="text-gray-500 animate-pulse text-lg">
          Loading financial data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-white rounded-lg shadow-lg text-center min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  const PIE_CHART_COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8b5cf6",
    "#3b82f6",
  ];

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text mb-2">
          Financial Dashboard
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8">
          A real-time overview of your business's financial health and
          performance.
        </p>
      </div>

      {/* Stats Cards Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Total Revenue Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transition-transform duration-300 hover:scale-[1.02]">
          <div className="flex items-center space-x-4">
            <div className="bg-green-500 text-white p-4 rounded-full shadow-md">
              <FaDollarSign className="text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 font-semibold text-sm">
                Total Revenue
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                ${data?.totalRevenue?.toFixed(2) || "0.00"}
              </h3>
            </div>
          </div>
        </div>

        {/* Total Bookings Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transition-transform duration-300 hover:scale-[1.02]">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500 text-white p-4 rounded-full shadow-md">
              <FaChartLine className="text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 font-semibold text-sm">
                Total Bookings
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                {data?.totalBookings || "0"}
              </h3>
            </div>
          </div>
        </div>

        {/* Most Popular Car Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transition-transform duration-300 hover:scale-[1.02]">
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-500 text-white p-4 rounded-full shadow-md">
              <FaCar className="text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 font-semibold text-sm">
                Most Popular Car
              </p>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-1">
                {data?.mostPopularCar || "N/A"}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Revenue Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200 animate-fade-in">
          <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-6">
            Monthly Revenue
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data?.monthlyRevenue}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip content={<CustomLineTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="monthly_revenue"
                stroke="url(#revenueGradient)"
                strokeWidth={3}
                activeDot={{ r: 8, stroke: "#3b82f6", fill: "#3b82f6" }}
                name="Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Car Popularity Bar Chart */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200 animate-fade-in">
          <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-6">
            Top 5 Most Popular Cars
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data?.carPopularity}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="car_name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip content={<CustomBarTooltip />} />
              <Legend />
              <Bar dataKey="booking_count" name="Number of Bookings">
                {data?.carPopularity.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={barColors[index % barColors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        // A new section in your return statement, placed within the grid
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200 animate-fade-in">
          <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-6">
            Revenue by Car Type
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data?.revenueByCarType} // Assume this data is available
                dataKey="revenue"
                nameKey="car_type"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {data?.revenueByCarType.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`$${value.toFixed(2)}`, name]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default FinancialDashboard;
