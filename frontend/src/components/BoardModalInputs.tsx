import { boardModalInputsProps } from "@/types";
import InputField from "./InputField";

const BoardModalInputs = ({
  inputs,
  setInputs,
  isLoading,
}: boardModalInputsProps) => {
  const { name, description } = inputs;

  return (
    <div className="flex flex-col justify-center gap-2">
      <InputField
        name="name"
        value={name}
        onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
        placeholder="Board Name"
        type="text"
        loading={isLoading}
      />
      <InputField
        name="description"
        value={description}
        onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
        placeholder="Board Description"
        type="text-area"
        loading={isLoading}
      />
    </div>
  );
};

export default BoardModalInputs;
