import { signUpInputsProps } from "@/types";
import { InputField } from "@/components";

const SignUpInputs = ({ inputs, setInputs }: signUpInputsProps) => {
  const { username, email, password, confirmPassword } = inputs;

  return (
    <div className="w-full flex flex-col gap-4">
      <InputField
        name="username"
        value={username}
        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
        placeholder="Username"
        type="text"
      />
      <InputField
        name="email"
        value={email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        placeholder="Email"
        type="email"
      />
      <InputField
        name="password"
        value={password}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        placeholder="Password"
        type="password"
      />
      <InputField
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) =>
          setInputs({ ...inputs, confirmPassword: e.target.value })
        }
        placeholder="Confirm Password"
        type="password"
      />
    </div>
  );
};

export default SignUpInputs;
