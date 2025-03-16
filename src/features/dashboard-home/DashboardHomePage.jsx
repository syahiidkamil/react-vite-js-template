import React from "react";
import { Link } from "react-router";
import { useAuth } from "../../shared/hooks/useAuth";

const DashboardHomePage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Welcome to your dashboard, {user.name}!
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mb-6">
        <p className="font-bold">Quick Tips</p>
        <p>
          Use the sidebar to navigate between different sections of your
          dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Your Products
          </h2>
          <p className="text-gray-600 mb-4">Manage and view your products.</p>
          <Link
            to="/products"
            className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHomePage;
