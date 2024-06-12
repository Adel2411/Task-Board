"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { addBoardModalProps } from "@/types";
import AddBoardModalInputs from "./AddBoardModalInputs";
import { IoClose, IoAdd } from "react-icons/io5";
import { addBoard } from "@/utils";
import toast from "react-hot-toast";
import { Toast } from "@/components";

const AddBoardModal = ({ isOpen, closeModal }: addBoardModalProps) => {
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.8 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: "50%",
      transition: { duration: 0.8, type: "spring" },
    },
    exit: { opacity: 0, y: 0, transition: { duration: 0.8 } },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found");
      return;
    }

    const response = await addBoard(token, inputs);

    toast.custom((t) => (
      <>
        {response ? (
          <Toast type="success" message="Board added successfully" t={t} />
        ) : (
          <Toast
            type="error"
            message="Error occured when adding the board"
            t={t}
          />
        )}
      </>
    ));

    setInputs({ name: "", description: "" });
    setLoading(false);
    closeModal();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-start justify-center z-50">
          <motion.div
            className="fixed inset-0 bg-background dark:bg-background-dark bg-opacity-80 dark:bg-opacity-80"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            onClick={closeModal}
          />
          <motion.div
            className="flex flex-col justify-center gap-8 bg-background dark:bg-background-dark rounded-lg p-6 sm:w-2/3 md:w-1/2 lg:w-1/3 shadow-lg relative"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <h2 className="text-2xl">Add Board</h2>
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
              className="flex flex-col justify-center gap-4"
            >
              <AddBoardModalInputs inputs={inputs} setInputs={setInputs} />
              <div className="flex justify-end">
                <button
                  disabled={loading}
                  type="submit"
                  className="disabled:cursor-not-allowed disabled:opacity-40 text-sm flex items-center justify-center gap-1 px-4 py-2 bg-primary dark:bg-primary-dark hover:bg-opacity-75 dark:hover:bg-opacity-75 text-white rounded-md"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Adding Board
                    </>
                  ) : (
                    <>
                      Add Board <IoAdd />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default AddBoardModal;
