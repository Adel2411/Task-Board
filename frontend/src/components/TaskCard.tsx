"use client";

import { motion } from "framer-motion";
import { taskCardProps } from "@/types";
import TaskModal from "./TaskModal";
import { useState } from "react";
import { buttonVariants } from "@/animations";
import { BsEmojiNeutralFill } from "react-icons/bs";
import { IoIosHappy, IoIosSad } from "react-icons/io";
import { FaAngry } from "react-icons/fa";

const TaskCard = ({ task, setTasks }: taskCardProps) => {
  const { _id, title, description, taskIcon, status } = task;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.li
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        key={_id}
        className={`py-4 px-10 flex items-center justify-between hover:cursor-pointer ${status === 0 ? "bg-white dark:bg-black" : status === 2 ? "bg-red-400 dark:bg-red-800" : status === 1 ? "bg-orange-400 dark:bg-orange-800" : "bg-green-400 dark:bg-green-800"} bg-opacity-50 dark:bg-opacity-80 rounded-lg shadow-md`}
        onClick={() => setIsOpen(true)}
      >
        <div>
          <h1 className="font-semibold text-lg">{title}</h1>
          <p className="opacity-50">{description}</p>
        </div>
        <div>
          {taskIcon === "default-icon" ? (
            <BsEmojiNeutralFill size={21} />
          ) : taskIcon === "happy" ? (
            <IoIosHappy size={25} />
          ) : taskIcon === "sad" ? (
            <IoIosSad size={25} />
          ) : (
            <FaAngry size={21} />
          )}
        </div>
      </motion.li>
      <TaskModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        type="edit"
        setTasks={setTasks}
        task={task}
      />
    </>
  );
};

export default TaskCard;
