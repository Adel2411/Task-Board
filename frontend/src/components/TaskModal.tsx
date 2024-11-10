"use client";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Task, taskModalInputsType, taskModalProps } from "@/types";
import { IoClose, IoAdd, IoSave } from "react-icons/io5";
import { addTask, deleteTask, updateTask } from "@/utils";
import toast from "react-hot-toast";
import { TaskModalInputs, Toast } from "@/components";
import { buttonVariants } from "@/animations";
import ConfirmToast from "./ConfirmToast";

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
    taskIcon: "default-icon",
    status: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (type === "edit" && task) {
      setInputs({
        title: task.title,
        description: task.description,
        taskIcon: task.taskIcon,
        status: task.status,
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
          taskIcon: "default-icon",
          status: 0,
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
          taskIcon: "default-icon",
          status: 0,
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

  const handleDelete = () => {
    toast.custom((t) => (
      <ConfirmToast
        t={t}
        message={`Are you sure you want to delete task ${task?.title} ?`}
        onConfirm={async () => {
          setLoading(true);

          const token = localStorage.getItem("token");
          if (!token) {
            console.error("Token not found");
            setLoading(false);
            return;
          }

          const id: string = task?._id as string;

          const response = await deleteTask(token, id);

          console.log(response, id);

          if (response === true) {
            setTasks((prev) => prev.filter((t) => t._id !== id));
            closeModal();
            toast.custom((t) => (
              <Toast type="success" message="Task deleted successfully" t={t} />
            ));
          } else {
            toast.custom((t) => (
              <Toast
                type="error"
                message="Error occurred when deleting the task"
                t={t}
              />
            ));
          }

          setLoading(false);
          toast.dismiss(t.id);
        }}
      />
    ));
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
            className={`fixed bottom-0 z-10 flex flex-col justify-center gap-8 bg-background dark:bg-background-dark rounded-lg px-6 py-10 h-fit w-full sm:w-[80%] md:w-[70%] lg:w-[50%] shadow-lg`}
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
              <TaskModalInputs
                inputs={inputs}
                setInputs={setInputs}
                isLoading={loading}
              />
              <div
                className={`flex  ${type === "edit" ? "justify-evenly" : "justify-end"}`}
              >
                {type === "edit" && (
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    disabled={loading}
                    type="button"
                    onClick={handleDelete}
                    className="disabled:cursor-not-allowed disabled:opacity-40 text-sm px-4 py-2 hover:bg-red-400 hover:bg-opacity-30 dark:hover:bg-red-700 dark:hover:bg-opacity-30 rounded-md"
                  >
                    Delete
                  </motion.button>
                )}
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
