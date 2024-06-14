"use client";

import ReactDOM from "react-dom";
import { shareModalProps } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

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
            className={`z-10 flex flex-col justify-center gap-8 bg-background dark:bg-background-dark rounded-lg p-6 sm:w-2/3 md:w-1/2 lg:w-1/3 shadow-lg`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          ></motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default ShareModal;
