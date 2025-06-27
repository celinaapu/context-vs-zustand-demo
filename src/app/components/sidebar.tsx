import { Calendar, BookOpen, Target, Home, User, X } from "lucide-react";
import { useSidebar } from "./contextProvider";

const sidebarItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: Calendar, label: "Routines", active: false },
  { icon: BookOpen, label: "Journal", active: false },
  { icon: Target, label: "Goals", active: false },
];

const Sidebar: React.FC = () => {
  const { isOpen, closeSidebar } = useSidebar();

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-blue-600 text-white">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">P</span>
            </div>
            <span className="font-semibold">Productivity</span>
          </div>
          <button
            onClick={closeSidebar}
            className=" p-1 rounded-md hover:bg-blue-700 text-white"
          >
            <X />
          </button>
        </div>

        <nav className="mt-8 px-4">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href="#"
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  item.active
                    ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="absolute bottom-8 left-4 right-4">
          <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User size={16} className="text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Martin</p>
              <p className="text-xs text-gray-500">martin@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
