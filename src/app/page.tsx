"use client";

import { Plus, Search } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { Routine, RoutineData, initialRoutines } from "../type/type";
import { SidebarProvider } from "./components/contextProvider";
import DeleteModal from "./components/deleteModal";
import NewRoutineModal from "./components/NewRoutineModal";
import DropdownToggle from "./components/toggle";
import Header from "./lib/header";
import { useRoutineStore } from "./stores/routineStore";

const AppContent: React.FC = () => {
  const { routines, addRoutine } = useRoutineStore();
  const [searchValue, setSearchValue] = useState<string>("");
  const [isNewRoutineModalOpen, setIsNewRoutineModalOpen] =
    useState<boolean>(false);

  const handleNewRoutine = (): void => {
    setIsNewRoutineModalOpen(true);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  const handleSaveRoutine = (data: RoutineData): void => {
    const newRoutine: Routine = {
      id: Date.now().toString(),
      title: data.title,
      timeRange: data.timeRange,
      tasks: 0,
      ...(data.illustrationType === "video"
        ? { video: data.illustration }
        : data.illustrationType === "image"
        ? { image: data.illustration }
        : data.illustrationType === "illustration"
        ? { illustration: data.illustration }
        : {}),
    };

    addRoutine(newRoutine);
    setIsNewRoutineModalOpen(false);
  };

  const allRoutines: Routine[] =
    routines && routines.length > 0 ? routines : initialRoutines;

  const filteredRoutines: Routine[] = allRoutines.filter((routine) =>
    routine.title.toLowerCase().includes(searchValue.toLowerCase())
  );

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
              Routines are a crucial part of anyone&apos;s life. They&apos;re
              the fundamental building blocks of what later become habits.
              Routines can be crafted as a collection of habits, that you want
              to implement during certain parts of the day. Create routines and
              make sure you&apos;re reminded of what you want to do, and when
              you want to do it!
            </p>
          </div>

          <div className="px-6 mb-8">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
              <div className="max-w-md w-full relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder="Search routines..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                />
              </div>

              <button
                onClick={handleNewRoutine}
                className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>New Routine</span>
              </button>
            </div>
          </div>

          <div className="px-6 pb-12">
            <div className="max-w-6xl mx-auto">
              {filteredRoutines.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRoutines.map((routine) => (
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
                            onEdit={() =>
                              console.log(`Editing routine: ${routine.title}`)
                            }
                          />
                        </div>

                        <div className="bg-gray-100 h-40 rounded my-4 flex items-center justify-center overflow-hidden">
                          {routine.video || routine.illustration ? (
                            <video
                              src={routine.video || routine.illustration}
                              className="w-full h-full object-cover"
                              autoPlay
                              loop
                              muted
                              controls={false}
                            />
                          ) : routine.image ? (
                            <Image
                              src={routine.image}
                              alt={routine.title}
                              width={400}
                              height={250}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-gray-400 text-sm">
                              No media available
                            </div>
                          )}
                        </div>

                        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1">
                          <Plus size={14} />
                          <span>Add a task</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 mt-8">
                  No routines found. Try creating one!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <NewRoutineModal
        open={isNewRoutineModalOpen}
        onClose={() => setIsNewRoutineModalOpen(false)}
        onSave={handleSaveRoutine}
      />

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
