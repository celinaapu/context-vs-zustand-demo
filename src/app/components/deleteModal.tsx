import React from "react";
import { X, AlertTriangle, Trash2 } from "lucide-react";
import { useRoutineStore } from "../stores/routineStore";
import { useUIStore } from "../stores/uiStore";


const DeleteModal: React.FC = () => {
  const { 
    deleteModalOpen, 
    deleteId, 
    deleteTitle, 
    closeDeleteModal 
  } = useUIStore();
  
  const { deleteRoutine } = useRoutineStore();

  const handleDelete = () => {
    if (deleteId) {
      deleteRoutine(deleteId);
      closeDeleteModal();
    }
  };

  if (!deleteModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 z-40" 
        onClick={closeDeleteModal} 
      />

      <div className="relative z-50 bg-white rounded-lg shadow-lg w-full max-w-md px-6 py-5">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={20} className="text-red-600" />
          <h2 className="text-base font-medium text-gray-900">
            Delete <span className="font-bold">{deleteTitle}</span> permanently?
          </h2>
          <button
            onClick={closeDeleteModal}
            className="ml-auto text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          There is no going back to retrieve data if you perform this action,
          are you totally sure you want to delete your routine?
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={closeDeleteModal}
            className="px-4 py-2 text-sm text-white bg-gray-500 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700 flex items-center gap-1"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;