"use client";

import { motion } from "framer-motion";
import { taskCardProps } from "@/types";
import TaskModal from "./TaskModal";
import { useState } from "react";
import { buttonVariants } from "@/animations";

const TaskCard = ({ task, setTasks }: taskCardProps) => {
  const { _id, title, description, taskIconName, statusId } = task;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.li
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        key={_id}
        className={`flex items-center justify-between hover:cursor-pointer ${statusId === 0 ? "bg-white dark:bg-black" : statusId === 1 ? "bg-red-400 dark:bg-red-800" : statusId === 2 ? "bg-orange-400 dark:bg-orange-800" : "bg-green-400 dark:bg-green-800"} bg-opacity-50 dark:bg-opacity-80  p-4 rounded-lg shadow-md`}
        onClick={() => setIsOpen(true)}
      >
        <div>
          <h1 className="font-semibold text-lg">{title}</h1>
          <p className="opacity-50">{description}</p>
        </div>
        <div>{taskIconName}</div>
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
