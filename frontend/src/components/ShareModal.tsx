"use client";

import ReactDOM from "react-dom";
import { shareModalProps } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { buttonVariants } from "@/animations";

const ShareModal = ({ isOpen, closeModal, link }: shareModalProps) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.8 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { duration: 1.5, type: "spring" },
    },
    exit: { scale: 0, transition: { duration: 1, type: "spring" } },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            className="fixed flex justify-center items-center inset-0 bg-background dark:bg-background-dark bg-opacity-80 dark:bg-opacity-80"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            onClick={closeModal}
          />
          <motion.div
            className={`relative z-10 flex flex-col justify-center gap-8 bg-background dark:bg-background-dark rounded-lg p-6 sm:w-2/3 md:w-1/2 lg:w-1/3 shadow-lg`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <motion.button
              initial={{ opacity: 0.5 }}
              whileHover={{ opacity: 1, transition: { duration: 0.1 } }}
              className="absolute top-2 right-2 disabled:opacity-30"
              onClick={closeModal}
            >
              <IoClose size={20} className="text-black dark:text-white" />
            </motion.button>
            <p>{link}</p>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleCopy}
              className="disabled:cursor-not-allowed disabled:opacity-40 text-sm px-4 py-2 bg-primary dark:bg-primary-dark text-white rounded-md"
            >
              Copy
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default ShareModal;
