import { Toast } from "react-hot-toast/headless";

// Gradient borders types
export interface gradientDivProps {
  children: React.ReactNode;
  className?: string;
}

// Input Types
export interface inputFieldProps {
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  placeholder: string;
  type: string;
}

// Loading Types
export interface loadingProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Toast Types
export interface toastProps {
  t: Toast;
  message: string;
  type: "success" | "error";
}

export interface confirmToastProps {
  t: Toast;
  message: string;
  onConfirm: () => void;
}

// Sign Up Types
export type signUpInputsType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export interface signUpInputsProps {
  inputs: signUpInputsType;
  setInputs: React.Dispatch<React.SetStateAction<signUpInputsType>>;
}

// Sign In Types
export type signInInputsType = {
  auth_identifier: string;
  password: string;
};

export interface signInInputsProps {
  inputs: signInInputsType;
  setInputs: React.Dispatch<React.SetStateAction<signInInputsType>>;
}

// Forgot Password Types
export type forgotPasswordInputsType = {
  email: string;
};

export interface forgotPasswordInputsProps {
  inputs: forgotPasswordInputsType;
  setInputs: React.Dispatch<React.SetStateAction<forgotPasswordInputsType>>;
}

// Reset Password Types
export type resetPasswordInputsType = {
  password: string;
  confirmPassword: string;
};

export interface resetPasswordInputsProps {
  inputs: resetPasswordInputsType;
  setInputs: React.Dispatch<React.SetStateAction<resetPasswordInputsType>>;
}

// Auth Context Types
export type AuthContextType = {
  isAuthorized: boolean;
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

// User Types
export type User = {
  username: string;
  email: string;
};

// Board Types
export type Board = {
  _id: string;
  name: string;
  description: string;
  owner?: string;
  is_public?: boolean;
  tasks?: Task[];
  __v?: number;
};

export interface boardCardProps {
  board: Board;
  favCounter: number;
  setFavCounter: React.Dispatch<React.SetStateAction<number>>;
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
}

export interface dropDownMenuProps {
  loading: boolean;
  handleEdit: () => void;
  handleShare: () => void;
  handleDelete: () => void;
}

export interface boardsBarProps {
  user: User | null;
  handleSignOut: () => void;
  favCounter: number;
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
}

export interface boardModalProps {
  isOpen: boolean;
  closeModal: () => void;
  type: "add" | "edit";
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
  board?: Board;
}

export type boardModalInputsType = {
  name: string;
  description: string;
};

export interface boardModalInputsProps {
  inputs: boardModalInputsType;
  setInputs: React.Dispatch<React.SetStateAction<boardModalInputsType>>;
}

export interface shareModalProps {
  isOpen: boolean;
  closeModal: () => void;
  link: string;
}

// Task Types
export type Task = {
  _id: string;
  title: string;
  description: string;
  taskIcon: "default-icon" | "sad" | "happy" | "angry";
  status: number | 0;
};

export interface tasksProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  isOwner: boolean;
}

export interface taskCardProps {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  isOwner: boolean;
}

export interface taskModalProps {
  isOpen: boolean;
  closeModal: () => void;
  type: "add" | "edit";
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  id?: string;
  task?: Task;
}

export type taskModalInputsType = {
  title: string;
  description: string;
  taskIcon: "default-icon" | "sad" | "happy" | "angry";
  status: number | 0;
};

export interface taskModalInputsProps {
  inputs: taskModalInputsType;
  setInputs: React.Dispatch<React.SetStateAction<taskModalInputsType>>;
}
