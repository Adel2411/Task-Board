import { forgotPasswordInputsProps } from "@/types";
import InputField from "./InputField";

const ForgotPasswordInputs = ({
  inputs,
  setInputs,
}: forgotPasswordInputsProps) => {
  const { email } = inputs;

  return (
    <div className="w-full flex flex-col gap-4">
      <InputField
        name="email"
        value={email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        placeholder="Email"
        type="email"
      />
    </div>
  );
};

export default ForgotPasswordInputs;
