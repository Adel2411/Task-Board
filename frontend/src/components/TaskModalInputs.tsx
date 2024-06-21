"use client";

import { motion } from "framer-motion";
import { taskModalInputsProps } from "@/types";
import InputField from "./InputField";
import { BsEmojiNeutralFill } from "react-icons/bs";
import { IoIosHappy, IoIosSad } from "react-icons/io";
import { FaAngry } from "react-icons/fa";

const TaskModalInputs = ({ inputs, setInputs }: taskModalInputsProps) => {
  const { title, description, taskIconName, statusId } = inputs;

  return (
    <div className="flex flex-col justify-center gap-8">
      <InputField
        name="title"
        value={title}
        onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
        placeholder="Task Title"
        type="text"
      />
      <InputField
        name="description"
        value={description}
        onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
        placeholder="Task Description"
        type="text-area"
      />
      <div className="flex items-center justify-evenly">
        <motion.button
          onClick={() => setInputs({ ...inputs, taskIconName: "neutral" })}
          className={`p-2 rounded-lg ${taskIconName === "neutral" && "border-black dark:border-white border-opacity-30 dark:border-opacity-30 border-2"}`}
        >
          <BsEmojiNeutralFill size={21} />
        </motion.button>
        <motion.button
          onClick={() => setInputs({ ...inputs, taskIconName: "happy" })}
          className={`p-2 rounded-lg ${taskIconName === "happy" && "border-black dark:border-white border-opacity-30 dark:border-opacity-30 border-2"}`}
        >
          <IoIosHappy size={25} />
        </motion.button>
        <motion.button
          onClick={() => setInputs({ ...inputs, taskIconName: "sad" })}
          className={`p-2 rounded-lg ${taskIconName === "sad" && "border-black dark:border-white border-opacity-30 dark:border-opacity-30 border-2"}`}
        >
          <IoIosSad size={25} />
        </motion.button>
        <motion.button
          onClick={() => setInputs({ ...inputs, taskIconName: "angry" })}
          className={`p-2 rounded-lg ${taskIconName === "angry" && "border-black dark:border-white border-opacity-30 dark:border-opacity-30 border-2"}`}
        >
          <FaAngry size={21} />
        </motion.button>
      </div>
      <div className="flex items-center justify-evenly">
        <motion.button
          className={`px-4 py-2 rounded-md ${statusId === 0 && "bg-gray-400 dark:bg-gray-800"}`}
          onClick={() => setInputs({ ...inputs, statusId: 0 })}
        >
          Neutral
        </motion.button>
        <motion.button
          className={`px-4 py-2 rounded-md ${statusId === 1 && "bg-red-400 dark:bg-red-800"}`}
          onClick={() => setInputs({ ...inputs, statusId: 1 })}
        >
          Not done
        </motion.button>
        <motion.button
          className={`px-4 py-2 rounded-md ${statusId === 2 && "bg-orange-400 dark:bg-orange-800"}`}
          onClick={() => setInputs({ ...inputs, statusId: 2 })}
        >
          In progress
        </motion.button>
        <motion.button
          className={`px-4 py-2 rounded-md ${statusId === 3 && "bg-green-400 dark:bg-green-800"}`}
          onClick={() => setInputs({ ...inputs, statusId: 3 })}
        >
          Completed
        </motion.button>
      </div>
    </div>
  );
};

export default TaskModalInputs;
