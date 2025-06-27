import { create } from "zustand";

interface UIStore {
  openDropdownId: string | null;
  setOpenDropdown: (id: string | null) => void;

  deleteModalOpen: boolean;
  deleteId: string | null;
  deleteTitle: string;
  openDeleteModal: (id: string, title: string) => void;
  closeDeleteModal: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  openDropdownId: null,
  setOpenDropdown: (id) => set({ openDropdownId: id }),

  deleteModalOpen: false,
  deleteId: null,
  deleteTitle: "",
  openDeleteModal: (id, title) =>
    set({
      deleteModalOpen: true,
      deleteId: id,
      deleteTitle: title,
    }),
  closeDeleteModal: () =>
    set({
      deleteModalOpen: false,
      deleteId: null,
      deleteTitle: "",
    }),
}));
