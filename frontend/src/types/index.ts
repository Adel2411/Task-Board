// Input Types
export interface inputFieldProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
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

// Auth Context Types
export interface AuthContextType {
  isAuthorized: boolean;
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
}
