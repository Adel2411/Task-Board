"use client";

import { motion } from "framer-motion";
import { taskCardProps } from "@/types";
import TaskModal from "./TaskModal";
import { useState } from "react";
import { buttonVariants } from "@/animations";
import { Angry, Frown, Meh, Smile } from "lucide-react";

const TaskCard = ({ task, setTasks, isOwner }: taskCardProps) => {
  const { _id, title, description, taskIcon, status } = task;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.li
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        key={_id}
        className={`p-4 flex items-center justify-center gap-4 ${isOwner && "hover:cursor-pointer"} ${status === 0 ? "bg-white dark:bg-black" : status === 2 ? "bg-red-400 dark:bg-red-800" : status === 1 ? "bg-orange-400 dark:bg-orange-800" : "bg-green-400 dark:bg-green-800"} bg-opacity-50 dark:bg-opacity-80 rounded-lg shadow-md`}
        onClick={() => setIsOpen(true)}
      >
        <div>
          <h1 className="font-semibold text-lg">{title}</h1>
          <p className="opacity-50 break-all">{description}</p>
        </div>
        <div>
          {taskIcon === "default-icon" ? (
            <Meh />
          ) : taskIcon === "happy" ? (
            <Smile />
          ) : taskIcon === "sad" ? (
            <Frown />
          ) : (
            <Angry />
          )}
        </div>
      </motion.li>
      {isOwner && (
        <TaskModal
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          type="edit"
          setTasks={setTasks}
          task={task}
        />
      )}
    </>
  );
};

export default TaskCard;
