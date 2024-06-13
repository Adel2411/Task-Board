import { motion } from "framer-motion";
import { confirmToastProps } from "@/types";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { buttonVariants, toastVariants } from "@/animations";

const ConfirmToast = ({ t, message, onConfirm }: confirmToastProps) => {
  return (
    <motion.main
      variants={toastVariants}
      initial="hidden"
      animate="visible"
      className="relative h-36 bg-dropdown bg-opacity-80 backdrop-blur-sm dark:bg-dropdown-dark dark:bg-opacity-80 rounded-xl w-fit flex flex-col items-center p-5 gap-1"
    >
      <div className="h-full flex items-center gap-3">
        <p className="text-wrap">{message}</p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => toast.dismiss(t.id)}
          className="hover:bg-white dark:hover:bg-black px-4 py-2 rounded-md"
        >
          Cancel
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onConfirm}
          className="bg-red-300 hover:bg-opacity-80 dark:bg-red-700 dark:hover:bg-opacity-80 px-4 py-2 rounded-md"
        >
          Delete
        </motion.button>
      </div>
      <motion.button
        initial={{ opacity: 0.5 }}
        whileHover={{ opacity: 1, transition: { duration: 0.1 } }}
        onClick={() => toast.dismiss(t.id)}
      >
        <IoClose size={20} className="absolute top-2 right-2" />
      </motion.button>
    </motion.main>
  );
};

export default ConfirmToast;
