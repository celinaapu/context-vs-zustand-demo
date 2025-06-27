import { create } from "zustand";

interface Routine {
  id: string;
  title: string;
  timeRange: string;
  tasks: string[];
}

interface RoutineStore {
  routines: Routine[];
  setRoutines: (routines: Routine[]) => void;
  addRoutine: (routine: Routine) => void;
  deleteRoutine: (id: string) => void;
  updateRoutine: (id: string, updates: Partial<Routine>) => void;
}

export const useRoutineStore = create<RoutineStore>((set) => ({
  routines: [
    {
      id: "1",
      title: "Bedtime Routine",
      timeRange: "20:30 - 22:30",
      tasks: ["Brush teeth", "Read book", "Meditate"],
    },
    {
      id: "2",
      title: "Wakeup Routine",
      timeRange: "06:30 - 07:30",
      tasks: ["Exercise", "Shower", "Breakfast"],
    },
    {
      id: "3",
      title: "Weekend Routine",
      timeRange: "10:00 - 12:00",
      tasks: ["Meal prep", "Clean house", "Plan week"],
    },
  ],
  setRoutines: (routines) => set({ routines }),
  addRoutine: (routine) =>
    set((state) => ({
      routines: [...state.routines, routine],
    })),
  deleteRoutine: (id) =>
    set((state) => ({
      routines: state.routines.filter((r) => r.id !== id),
    })),
  updateRoutine: (id, updates) =>
    set((state) => ({
      routines: state.routines.map((r) =>
        r.id === id ? { ...r, ...updates } : r
      ),
    })),
}));
