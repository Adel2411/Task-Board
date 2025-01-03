import { signInInputsProps } from "@/types";
import { InputField } from "@/components";

const SignUpInputs = ({ inputs, setInputs, isLoading }: signInInputsProps) => {
  const { auth_identifier, password } = inputs;

  return (
    <div className="w-full flex flex-col gap-4">
      <InputField
        name="auth_identifier"
        value={auth_identifier}
        onChange={(e) =>
          setInputs({ ...inputs, auth_identifier: e.target.value })
        }
        placeholder="Username or Email"
        type="text"
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
    </div>
  );
};

export default SignUpInputs;
