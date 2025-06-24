import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Navigation from "./Navigation";

const DashboardLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const menuItems = [
    {
      title: "Dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      path: "/dashboard",
    },
    {
      title: "Users",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      path: "/users",
    },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 h-[calc(100vh-4rem)] sticky top-16 bg-white border-r border-gray-200 shadow-sm`}>
          <div className="h-full flex flex-col">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className={`text-sm font-semibold text-gray-600 uppercase tracking-wider transition-opacity ${sidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                  Navigation
                </h2>
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                  <svg className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${sidebarCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 p-4 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`sidebar-item ${
                    isActive(item.path) ? 'sidebar-item-active' : 'sidebar-item-inactive'
                  }`}
                >
                  <span className={`transition-colors ${isActive(item.path) ? 'text-blue-700' : 'text-gray-500'}`}>
                    {item.icon}
                  </span>
                  <span className={`font-medium transition-all duration-200 ${sidebarCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                    {item.title}
                  </span>
                  {isActive(item.path) && !sidebarCollapsed && (
                    <div className="ml-auto w-1 h-4 bg-blue-600 rounded-full"></div>
                  )}
                </Link>
              ))}
            </nav>

            {/* User Profile Section */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-white font-medium shadow-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className={`transition-all duration-200 ${sidebarCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                  <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role || 'User'}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-hidden">
          <div className="max-w-7xl mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;