"use client";

import { motion } from "framer-motion";
import { taskModalInputsProps } from "@/types";
import InputField from "./InputField";
import { BsEmojiNeutralFill } from "react-icons/bs";
import { IoIosHappy, IoIosSad } from "react-icons/io";
import { FaAngry } from "react-icons/fa";
import { choiceButtonVariants } from "@/animations";

const TaskModalInputs = ({ inputs, setInputs }: taskModalInputsProps) => {
  const { title, description, taskIcon, status } = inputs;

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
      <div className="flex items-center justify-start gap-5 flex-wrap">
        <motion.button
          type="button"
          onClick={() => setInputs({ ...inputs, taskIcon: "default-icon" })}
          className={`p-2 rounded-lg hover:border-2 hover:border-black dark:hover:border-white hover:border-opacity-10 dark:hover:border-opacity-10 ${taskIcon === "default-icon" && "bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-10 hover:border-none dark:hover:border-none"}`}
        >
          <BsEmojiNeutralFill size={21} />
        </motion.button>
        <motion.button
          type="button"
          onClick={() => setInputs({ ...inputs, taskIcon: "happy" })}
          className={`p-2 rounded-lg hover:border-2 hover:border-black dark:hover:border-white hover:border-opacity-10 dark:hover:border-opacity-10 ${taskIcon === "happy" && "bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-10 hover:border-none dark:hover:border-none"}`}
        >
          <IoIosHappy size={25} />
        </motion.button>
        <motion.button
          type="button"
          onClick={() => setInputs({ ...inputs, taskIcon: "sad" })}
          className={`p-2 rounded-lg hover:border-2 hover:border-black dark:hover:border-white hover:border-opacity-10 dark:hover:border-opacity-10 ${taskIcon === "sad" && "bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-10 hover:border-none dark:hover:border-none"}`}
        >
          <IoIosSad size={25} />
        </motion.button>
        <motion.button
          type="button"
          onClick={() => setInputs({ ...inputs, taskIcon: "angry" })}
          className={`p-2 rounded-lg hover:border-2 hover:border-black dark:hover:border-white hover:border-opacity-10 dark:hover:border-opacity-10 ${taskIcon === "angry" && "bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-10 hover:border-none dark:hover:border-none"}`}
        >
          <FaAngry size={21} />
        </motion.button>
      </div>
      <div className="flex items-center justify-start gap-5 flex-wrap">
        <motion.button
          // variants={choiceButtonVariants}
          type="button"
          className={`px-4 py-2 rounded-md ${status === 0 && "bg-white dark:bg-black"}`}
          onClick={() => setInputs({ ...inputs, status: 0 })}
        >
          Neutral
        </motion.button>
        <motion.button
          // variants={choiceButtonVariants}
          type="button"
          className={`px-4 py-2 rounded-md ${status === 2 && "bg-red-400 dark:bg-red-800"}`}
          onClick={() => setInputs({ ...inputs, status: 2 })}
        >
          Wrong
        </motion.button>
        <motion.button
          // variants={choiceButtonVariants}
          type="button"
          className={`px-4 py-2 rounded-md ${status === 1 && "bg-orange-400 dark:bg-orange-800"}`}
          onClick={() => setInputs({ ...inputs, status: 1 })}
        >
          Progress
        </motion.button>
        <motion.button
          // variants={choiceButtonVariants}
          type="button"
          className={`px-4 py-2 rounded-md ${status === 3 && "bg-green-400 dark:bg-green-800"}`}
          onClick={() => setInputs({ ...inputs, status: 3 })}
        >
          Completed
        </motion.button>
      </div>
    </div>
  );
};

export default TaskModalInputs;
