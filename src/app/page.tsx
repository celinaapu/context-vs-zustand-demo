"use client";
import { Search, Plus, Menu } from "lucide-react";

import { SidebarProvider, useSidebar } from "./components/contextProvider";
import DeleteModal from "./components/deleteModal";
import DropdownToggle from "./components/toggle";
import { useRoutineStore } from "./stores/routineStore";
import Header from "./lib/header";

const AppContent: React.FC = () => {
  const { toggleSidebar } = useSidebar();
  const { routines } = useRoutineStore();

  return (
    <div className="h-screen bg-gray-50 flex">
      <div className="flex-1 flex flex-col overflow-hidden">
        
        <Header />

        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="text-center py-12 px-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your Routines
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Routines are a crucial part of anyone's life. They're the
              fundamental building blocks of what later become habits. Routines
              can be crafted as a collection of habits, that you want to
              implement during certain parts of the day. Create routines and
              make sure you're reminded of what you want to do, and when you
              want to do it!
            </p>
          </div>

          <div className="px-6 mb-8">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
              <div className="relative flex-1 max-w-md">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <button className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Plus size={16} />
                <span>New Routine</span>
              </button>
            </div>
          </div>

          <div className="px-6 pb-12">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {routines.map((routine) => (
                  <div
                    key={routine.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {routine.title}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {routine.timeRange}
                          </span>
                        </div>

                        <DropdownToggle
                          routineId={routine.id}
                          routineTitle={routine.title}
                          onEdit={() => alert(`Edit ${routine.title}`)}
                        />
                      </div>
                      <div className="bg-gray-400 h-24 rounded my-4"></div>

                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1">
                        <Plus size={14} />
                        <span>Add a task</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <SidebarProvider>
      <AppContent />
    </SidebarProvider>
  );
};

export default App;
