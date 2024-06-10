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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  type: "success" | "error" | "loading";
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
  id: string;
  title: string;
  description: string;
  owner?: string;
  is_public?: boolean;
};

export interface boardCardProps {
  board: Board;
}

export interface boardsBarProps {
  user: User | null;
  handleSignOut: () => void;
}
