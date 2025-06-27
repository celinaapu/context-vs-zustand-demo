"use client";

import { Menu, Bell, Settings, User } from "lucide-react";
import { useSidebar } from "../components/contextProvider";
import Sidebar from "../components/sidebar";

const Header: React.FC = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="bg-blue-400 shadow-sm border-b border-blue-200">
      <div className="flex items-center justify-between h-16 px-6">
        <button
          onClick={toggleSidebar}
          className="bg-white p-2 rounded-md shadow-md hover:bg-gray-100"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <div className="flex-1 flex justify-center">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">P</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="text-blue-700 hover:text-blue-900"
            aria-label="Notifications"
          >
            <Bell size={20} />
          </button>
          <button
            className="text-blue-700 hover:text-blue-900"
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>
          <button
            className="text-blue-700 hover:text-blue-900"
            aria-label="User Profile"
          >
            <User size={20} />
          </button>
        </div>
      </div>
      <Sidebar />
    </header>
  );
};

export default Header;
