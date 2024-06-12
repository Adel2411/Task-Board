import { addBoardModalInputsProps } from "@/types";
import InputField from "./InputField";

const AddBoardModalInputs = ({
  inputs,
  setInputs,
}: addBoardModalInputsProps) => {
  const { name, description } = inputs;

  return (
    <div className="flex flex-col justify-center gap-2">
      <InputField
        name="name"
        value={name}
        onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
        placeholder="Board Name"
        type="text"
      />
      <InputField
        name="description"
        value={description}
        onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
        placeholder="Board Description"
        type="text-area"
      />
    </div>
  );
};

export default AddBoardModalInputs;
