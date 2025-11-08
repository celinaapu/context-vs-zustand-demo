export interface Routine {
  id: string;
  title: string;
  timeRange: string;
  tasks: number; 
  video?: string;
  image?: string;
  illustration?: string; 
}

export interface Task {
  id: string;
  routineId: string;
  title: string;
  description?: string;
  completed: boolean;
  order: number;
  createdAt?: Date;
}

export interface RoutineStore {
  routines: Routine[];
  addRoutine: (routine: Routine) => void; 
  updateRoutine: (id: string, routine: Partial<Routine>) => void;
  deleteRoutine: (id: string) => void;
  getRoutineById: (id: string) => Routine | undefined;
}

export interface RoutineData {
  title: string;
  timeRange: string;
  illustrationType: "video" | "image";
  illustration: string;
}
export interface NewRoutineModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: RoutineData) => void;
}

export interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  routineTitle: string;
}

export interface DropdownToggleProps {
  routineId: string;
  routineTitle: string;
  onEdit: () => void;
  onDelete: () => void;
}

export const initialRoutines: Routine[] = [
  {
    id: "1",
    title: "Morning Energizer",
    timeRange: "6:00 AM - 8:00 AM",
    video:
      "https://res.cloudinary.com/celina/video/upload/v1762004492/0_Woman_Black_Woman_3840x2160.BPWLAiGC.mp4_cixoiz.mp4",
    tasks: 3,
  },
  {
    id: "2",
    title: "Focus Time",
    timeRange: "9:00 AM - 12:00 PM",
    illustration:
      "https://res.cloudinary.com/celina/video/upload/v1755429195/1475515_People_Business_3840x2160_b4pnd7.mp4",
    tasks: 5,
  },
  {
    id: "3",
    title: "Evening Wind Down",
    timeRange: "8:00 PM - 10:00 PM",
    image:
      "https://res.cloudinary.com/celina/image/upload/v1762011119/istockphoto-1388989894-612x612_ezmijc.jpg",
    tasks: 4,
  },
];
