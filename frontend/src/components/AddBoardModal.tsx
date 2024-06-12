"use client";

import React from "react";
import { motion } from "framer-motion";
import { addBoardModalProps } from "@/types";

const AddBoardModal = ({ isOpen, closeModal }: addBoardModalProps) => {
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

  if (!isOpen) return null;

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
            className="bg-background dark:bg-background-dark rounded-lg p-6 sm:w-2/3 md:w-1/2 lg:w-1/3 shadow-lg relative"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <h2 className="text-2xl mb-4">Add Board</h2>
            <button
              className="absolute top-2 right-2 text-xl"
              onClick={closeModal}
            >
              &times;
            </button>
            {/* Add your form or modal content here */}
            <form>
              <div className="mb-4">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="boardName"
                >
                  Board Name
                </label>
                <input
                  id="boardName"
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter board name"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  onClick={closeModal}
                >
                  Add Board
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
