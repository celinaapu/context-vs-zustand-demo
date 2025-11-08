import { create } from "zustand";
import { RoutineStore, initialRoutines } from "../../type/type";

export const useRoutineStore = create<RoutineStore>((set, get) => ({
  routines: initialRoutines,

  addRoutine: (routine) =>
    set((state) => ({
      routines: [...state.routines, routine],
    })),

  updateRoutine: (id, updates) =>
    set((state) => ({
      routines: state.routines.map((r) =>
        r.id === id ? { ...r, ...updates } : r
      ),
    })),

  deleteRoutine: (id) =>
    set((state) => ({
      routines: state.routines.filter((r) => r.id !== id),
    })),

  getRoutineById: (id) => {
    return get().routines.find((r) => r.id === id);
  },
}));
