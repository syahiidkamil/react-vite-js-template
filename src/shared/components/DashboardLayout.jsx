import React from "react";
import { Link, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Navigation from "./Navigation";

const DashboardLayout = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="container mx-auto py-6">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded shadow p-4 mr-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold">Dashboard</h2>
              <p className="text-sm text-gray-500">Welcome, {user.name}</p>
            </div>

            <nav>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/dashboard"
                    className="block py-2 px-4 rounded hover:bg-gray-100"
                  >
                    Dashboard Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="block py-2 px-4 rounded hover:bg-gray-100"
                  >
                    Products
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main content area */}
          <div className="flex-1 bg-white rounded shadow p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
