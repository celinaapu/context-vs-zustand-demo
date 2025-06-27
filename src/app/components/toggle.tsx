import React, { useRef, useEffect } from "react";
import { Edit, Trash2, MoreHorizontal } from "lucide-react";
import { useUIStore } from "../stores/uiStore";

interface DropdownProps {
  routineId: string;
  routineTitle: string;
  className?: string;
  onEdit?: () => void;
}

const DropdownToggle: React.FC<DropdownProps> = ({
  routineId,
  routineTitle,
  className = "",
  onEdit,
}) => {
  const { openDropdownId, setOpenDropdown, openDeleteModal } = useUIStore();

  const ref = useRef<HTMLDivElement>(null);
  const isOpen = openDropdownId === routineId;

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        onClick={() => setOpenDropdown(isOpen ? null : routineId)}
        className="p-1 rounded-md hover:bg-gray-100"
        aria-label="More options"
      >
        <MoreHorizontal size={18} className="text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-md z-50">
          <button
            onClick={() => {
              setOpenDropdown(null);
              onEdit?.();
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Edit size={16} className="mr-2" /> Edit
          </button>
          <button
            onClick={() => {
              setOpenDropdown(null);
              openDeleteModal(routineId, routineTitle);
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <Trash2 size={16} className="mr-2" /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownToggle;
