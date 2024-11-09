import { signUpInputsProps } from "@/types";
import { InputField } from "@/components";

const SignUpInputs = ({ inputs, setInputs, isLoading }: signUpInputsProps) => {
  const { username, email, password, confirmPassword } = inputs;

  return (
    <div className="w-full flex flex-col gap-4">
      <InputField
        name="username"
        value={username}
        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
        placeholder="Username"
        type="text"
        loading={isLoading}
      />
      <InputField
        name="email"
        value={email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        placeholder="Email"
        type="email"
        loading={isLoading}
      />
      <InputField
        name="password"
        value={password}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        placeholder="Password"
        type="password"
        loading={isLoading}
      />
      <InputField
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) =>
          setInputs({ ...inputs, confirmPassword: e.target.value })
        }
        placeholder="Confirm Password"
        type="password"
        loading={isLoading}
      />
    </div>
  );
};

export default SignUpInputs;
