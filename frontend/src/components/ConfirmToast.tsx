import { motion } from "framer-motion";
import { confirmToastProps } from "@/types";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

const ConfirmToast = ({ t, message, onConfirm }: confirmToastProps) => {
  return (
    <main className="relative h-36 bg-white shadow-[0_0_20px] shadow-red-300 dark:shadow-red-500 dark:bg-black rounded-xl w-fit flex flex-col items-center p-5 gap-1">
      <div className="h-full flex items-center gap-3">
        <p className="text-wrap">{message}</p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => toast.dismiss(t.id)}
          className="hover:bg-gray-200 dark:hover:bg-gray-800 px-4 py-2 rounded-md"
        >
          Cancel
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onConfirm}
          className="bg-red-500 hover:bg-opacity-80 dark:bg-red-700 dark:hover:bg-opacity-80 px-4 py-2 rounded-md"
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
    </main>
  );
};

export default ConfirmToast;
