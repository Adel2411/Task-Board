"use client";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { boardModalProps } from "@/types";
import BoardModalInputs from "./BoardModalInputs";
import { IoClose, IoAdd, IoSave } from "react-icons/io5";
import { addBoard, updateBoard } from "@/utils"; // Assuming you have an editBoard function
import toast from "react-hot-toast";
import { Toast } from "@/components";
import { buttonVariants } from "@/animations";

const BoardModal = ({ isOpen, closeModal, type, board }: boardModalProps) => {
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (type === "edit" && board) {
      setInputs({ name: board.name, description: board.description });
    }
  }, [type, board]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.8 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { y: -450 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.5, type: "spring" },
    },
    exit: { y: -450, transition: { duration: 1, type: "spring" } },
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

    let response: boolean | string;
    if (type === "add") {
      response = await addBoard(token, inputs);
    } else if (type === "edit" && board) {
      response = await updateBoard(token, board, inputs);
    }

    toast.custom((t) => (
      <>
        {typeof response === "string" && (
          <Toast type="error" message={`${response}`} t={t} />
        )}
        {response === true ? (
          <Toast
            type="success"
            message={`${type === "add" ? "Board added" : "Board updated"} successfully`}
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
    setInputs({ name: "", description: "" });
    closeModal();
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
            className={`fixed top-0 z-10 flex flex-col justify-center gap-8 bg-background dark:bg-background-dark rounded-lg p-6 sm:w-2/3 md:w-1/2 lg:w-1/3 shadow-lg`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <h2 className="text-2xl">
              {type === "add" ? "Add Board" : "Edit Board"}
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
              className="flex flex-col justify-center gap-4"
            >
              <BoardModalInputs inputs={inputs} setInputs={setInputs} />
              <div className="flex justify-between">
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  disabled={loading}
                  type="button"
                  onClick={closeModal}
                  className="disabled:cursor-not-allowed disabled:opacity-40 text-sm px-4 py-2 hover:bg-black hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-10 rounded-md"
                >
                  Close
                </motion.button>
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
                      {type === "add" ? "Adding Board" : "Updating Board"}
                    </>
                  ) : (
                    <>
                      {type === "add" ? (
                        <>
                          Add Board <IoAdd />
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

export default BoardModal;
