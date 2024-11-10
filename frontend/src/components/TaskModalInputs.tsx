"use client";

import { motion } from "framer-motion";
import { taskModalInputsProps } from "@/types";
import InputField from "./InputField";
import { Angry, Frown, Meh, Smile } from "lucide-react";

const TaskModalInputs = ({
  inputs,
  setInputs,
  isLoading,
}: taskModalInputsProps) => {
  const { title, description, taskIcon, status } = inputs;

  return (
    <div className="flex flex-col justify-center gap-8">
      <InputField
        name="title"
        value={title}
        onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
        placeholder="Task Title"
        type="text"
        loading={isLoading}
      />
      <InputField
        name="description"
        value={description}
        onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
        placeholder="Task Description"
        type="text-area"
        loading={isLoading}
      />
      <div className="flex items-center justify-start gap-5 flex-wrap">
        <motion.button
          type="button"
          onClick={() => setInputs({ ...inputs, taskIcon: "default-icon" })}
          className={`p-2 rounded-lg hover:border-2 hover:border-black dark:hover:border-white hover:border-opacity-10 dark:hover:border-opacity-10 ${taskIcon === "default-icon" && "bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-10 hover:border-none dark:hover:border-none"}`}
        >
          <Meh />
        </motion.button>
        <motion.button
          type="button"
          onClick={() => setInputs({ ...inputs, taskIcon: "happy" })}
          className={`p-2 rounded-lg hover:border-2 hover:border-black dark:hover:border-white hover:border-opacity-10 dark:hover:border-opacity-10 ${taskIcon === "happy" && "bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-10 hover:border-none dark:hover:border-none"}`}
        >
          <Smile />
        </motion.button>
        <motion.button
          type="button"
          onClick={() => setInputs({ ...inputs, taskIcon: "sad" })}
          className={`p-2 rounded-lg hover:border-2 hover:border-black dark:hover:border-white hover:border-opacity-10 dark:hover:border-opacity-10 ${taskIcon === "sad" && "bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-10 hover:border-none dark:hover:border-none"}`}
        >
          <Frown />
        </motion.button>
        <motion.button
          type="button"
          onClick={() => setInputs({ ...inputs, taskIcon: "angry" })}
          className={`p-2 rounded-lg hover:border-2 hover:border-black dark:hover:border-white hover:border-opacity-10 dark:hover:border-opacity-10 ${taskIcon === "angry" && "bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-10 hover:border-none dark:hover:border-none"}`}
        >
          <Angry />
        </motion.button>
      </div>
      <div className="flex items-center justify-start gap-5 flex-wrap">
        <motion.button
          type="button"
          className={`group overflow-hidden relative px-4 py-2 rounded-md border-2 border-black dark:border-white border-opacity-10 dark:border-opacity-10 ${status === 0 && "bg-black dark:bg-white bg-opacity-20 dark:bg-opacity-20 border-none"}`}
          onClick={() => setInputs({ ...inputs, status: 0 })}
        >
          <div
            className={`absolute inset-0 bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-10 translate-y-[100px] ${status !== 1 && "group-hover:translate-y-[0px] transition-all duration-500"}`}
          />
          <div className="relative z-10">Neutral</div>
        </motion.button>
        <motion.button
          type="button"
          className={`group overflow-hidden relative px-4 py-2 rounded-md border-2 border-red-400 dark:border-red-800 border-opacity-40 dark:border-opacity-40 ${status === 2 && "bg-red-400 dark:bg-red-800 bg-opacity-60 dark:bg-opacity-60 border-none"}`}
          onClick={() => setInputs({ ...inputs, status: 2 })}
        >
          <div
            className={`absolute inset-0 bg-red-400 dark:bg-red-800 bg-opacity-40 dark:bg-opacity-40 translate-y-[100px] ${status !== 2 && "group-hover:translate-y-[0px] transition-all duration-500"}`}
          />
          <div className="relative z-10">Won't do</div>
        </motion.button>
        <motion.button
          type="button"
          className={`group overflow-hidden relative px-4 py-2 rounded-md border-2 border-orange-400 dark:border-orange-800 border-opacity-40 dark:border-opacity-40 ${status === 1 && "bg-orange-400 dark:bg-orange-800 bg-opacity-60 dark:bg-opacity-60"}`}
          onClick={() => setInputs({ ...inputs, status: 1 })}
        >
          <div
            className={`absolute inset-0 bg-orange-400 dark:bg-orange-800 bg-opacity-40 dark:bg-opacity-40 translate-y-[100px] ${status !== 1 && "group-hover:translate-y-[0px] transition-all duration-500"}`}
          />
          <div className="relative z-10">Progress</div>
        </motion.button>
        <motion.button
          type="button"
          className={`group overflow-hidden relative px-4 py-2 rounded-md border-2 border-green-400 dark:border-green-800 border-opacity-40 dark:border-opacity-40 ${status === 3 && "bg-green-400 dark:bg-green-800 bg-opacity-60 dark:bg-opacity-60"}`}
          onClick={() => setInputs({ ...inputs, status: 3 })}
        >
          <div
            className={`absolute inset-0 bg-green-400 dark:bg-green-800 bg-opacity-40 dark:bg-opacity-40 translate-y-[100px] ${status !== 3 && "group-hover:translate-y-[0px] transition-all duration-500"}`}
          />
          <div className="relative z-10">Completed</div>
        </motion.button>
      </div>
    </div>
  );
};

export default TaskModalInputs;
