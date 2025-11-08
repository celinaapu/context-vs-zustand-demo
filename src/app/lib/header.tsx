"use client";

import { Bell, Menu, Settings, User } from "lucide-react";
import Image from "next/image";
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
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden">
            <Image
              src="https://res.cloudinary.com/celina/image/upload/v1741250556/download_1_umgcz8.jpg"
              alt="App Logo"
              width={40}
              height={40}
              className="object-contain"
            />
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
