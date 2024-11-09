import { resetPasswordInputsProps } from "@/types";
import { InputField } from "@/components";

const ResetPasswordInputs = ({
  inputs,
  setInputs,
  isLoading,
}: resetPasswordInputsProps) => {
  const { password, confirmPassword } = inputs;

  return (
    <div className="w-full flex flex-col gap-4">
      <InputField
        name="password"
        value={password}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        placeholder="New password"
        type="password"
        loading={isLoading}
      />
      <InputField
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) =>
          setInputs({ ...inputs, confirmPassword: e.target.value })
        }
        placeholder="Confirm new password"
        type="password"
        loading={isLoading}
      />
    </div>
  );
};

export default ResetPasswordInputs;
