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

// Forget Password Types
export type forgetPasswordInputsType = {
  password: string;
  confirmPassword: string;
};

export interface forgetPasswordInputsProps {
  inputs: forgetPasswordInputsType;
  setInputs: React.Dispatch<React.SetStateAction<forgetPasswordInputsType>>;
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
  handleLogOut: () => void;
}
