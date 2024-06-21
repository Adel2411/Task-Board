"use client";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Task, taskModalInputsType, taskModalProps } from "@/types";
import { IoClose, IoAdd, IoSave } from "react-icons/io5";
import { addTask, updateTask } from "@/utils";
import toast from "react-hot-toast";
import { TaskModalInputs, Toast } from "@/components";
import { buttonVariants } from "@/animations";

const TaskModal = ({
  isOpen,
  closeModal,
  type,
  setTasks,
  id,
  task,
}: taskModalProps) => {
  const [inputs, setInputs] = useState<taskModalInputsType>({
    title: "",
    description: "",
    taskIconName: "neutral",
    statusId: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (type === "edit" && task) {
      setInputs({
        title: task.title,
        description: task.description,
        taskIconName: task.taskIconName,
        statusId: task.statusId,
      });
    }
  }, [type, task]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.8 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { y: 650 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.5, type: "spring" },
    },
    exit: { y: 650, transition: { duration: 0.8, type: "spring" } },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found");
      setLoading(false);
      return;
    }

    let response: boolean | string | Task;
    if (type === "add") {
      response = await addTask(token, id as string, inputs);

      if (typeof response === "object" && response) {
        setTasks((prev) => [...prev, response as Task]);
        setInputs({
          title: "",
          description: "",
          taskIconName: "neutral",
          statusId: 0,
        });
        closeModal();
      }
    } else if (type === "edit" && task) {
      response = await updateTask(token, task._id, inputs);

      if (response === true) {
        setTasks((prev) =>
          prev.map((t) => (t._id === task._id ? { ...t, ...inputs } : t)),
        );
        setInputs({
          title: "",
          description: "",
          taskIconName: "neutral",
          statusId: 0,
        });
        closeModal();
      }
    }

    toast.custom((t) => (
      <>
        {typeof response === "string" && (
          <Toast type="error" message={`${response}`} t={t} />
        )}
        {(typeof response === "object" && type === "add" && response) ||
        (type === "edit" && response === true) ? (
          <Toast
            type="success"
            message={`${type === "add" ? "Task added" : "Task updated"} successfully`}
            t={t}
          />
        ) : (
          response === false && (
            <Toast
              type="error"
              message={`Error occurred when ${type === "add" ? "adding" : "updating"} the board`}
              t={t}
            />
          )
        )}
      </>
    ));

    setLoading(false);
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            className="fixed inset-0 bg-background dark:bg-background-dark bg-opacity-80 dark:bg-opacity-80"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            onClick={closeModal}
          />
          <motion.div
            className={`fixed bottom-0 z-10 flex flex-col justify-center gap-8 bg-background dark:bg-background-dark rounded-lg p-6 h-fit sm:w-2/3 md:w-1/2 lg:w-1/3 shadow-lg`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <h2 className="text-2xl">
              {type === "add" ? "Add Task" : "Edit Task"}
            </h2>
            <motion.button
              initial={{ opacity: 0.5 }}
              whileHover={{ opacity: 1, transition: { duration: 0.1 } }}
              disabled={loading}
              className="absolute top-2 right-2 disabled:opacity-30"
              onClick={closeModal}
            >
              <IoClose size={20} className="text-black dark:text-white" />
            </motion.button>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center gap-6"
            >
              <TaskModalInputs inputs={inputs} setInputs={setInputs} />
              <div className="flex justify-end">
                {/* <motion.button */}
                {/*   variants={buttonVariants} */}
                {/*   whileHover="hover" */}
                {/*   whileTap="tap" */}
                {/*   disabled={loading} */}
                {/*   type="button" */}
                {/*   onClick={closeModal} */}
                {/*   className="disabled:cursor-not-allowed disabled:opacity-40 text-sm px-4 py-2 hover:bg-black hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-10 rounded-md" */}
                {/* > */}
                {/*   Close */}
                {/* </motion.button> */}
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  disabled={loading}
                  type="submit"
                  className="disabled:cursor-not-allowed disabled:opacity-40 text-sm flex items-center justify-center gap-1 px-4 py-2 bg-primary dark:bg-primary-dark text-white rounded-md"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      {type === "add" ? "Adding Task" : "Updating Task"}
                    </>
                  ) : (
                    <>
                      {type === "add" ? (
                        <>
                          Add Task <IoAdd />
                        </>
                      ) : (
                        <>
                          Save Changes <IoSave />
                        </>
                      )}
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default TaskModal;
