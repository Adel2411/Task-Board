"use client";

import ReactDOM from "react-dom";
import { shareModalProps } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { HiClipboardDocument, HiClipboardDocumentCheck } from "react-icons/hi2";
import { buttonVariants } from "@/animations";
import { useState } from "react";
import Toast from "./Toast";
import toast from "react-hot-toast";

const ShareModal = ({ isOpen, closeModal, link }: shareModalProps) => {
  const [isCopied, setIsCopied] = useState(false);

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
    setIsCopied(true);
    navigator.clipboard.writeText(link);
    toast.custom((t) => (
      <Toast
        message="Link copied to clipboard, you can now share it with your friends !"
        type="success"
        t={t}
      />
    ));
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
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
            className={`relative z-10 flex flex-col justify-center gap-5 bg-background dark:bg-background-dark rounded-lg pt-10 p-6 sm:w-2/3 md:w-1/2 lg:w-1/3 shadow-lg`}
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
            <h1 className="text-xl md:text-2xl font-semibold">Share Link</h1>
            <div className="flex items-center justify-start">
              <input
                value={link}
                className="w-full px-4 h-10 bg-black bg-opacity-5 dark:bg-white dark:bg-opacity-5 rounded-l-md"
              />
              <motion.button
                variants={buttonVariants}
                whileHover={isCopied ? {} : "hover"}
                onClick={handleCopy}
                disabled={isCopied}
                className="h-10 flex items-center justify-center gap-2 disabled:cursor-default disabled:bg-opacity-60 dark:disabled:bg-opacity-60 text-sm px-4 py-2 bg-primary dark:bg-primary-dark text-white rounded-r-md"
              >
                {isCopied ? (
                  <HiClipboardDocumentCheck size={20} />
                ) : (
                  <HiClipboardDocument size={20} />
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default ShareModal;
