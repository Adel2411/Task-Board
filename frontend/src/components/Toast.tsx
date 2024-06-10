import { toastProps } from "@/types";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

const Toast = ({ t, message, type }: toastProps) => {
  return (
    <main
      className={`h-20 bg-white shadow-[0_0_20px] ${type === "success" ? "shadow-green-500" : "shadow-red-500"} dark:bg-black rounded-xl w-fit flex items-center p-2 gap-2`}
    >
      <div className="h-full flex items-center gap-3">
        {type === "success" ? (
          <FaCheckCircle size={20} className="text-green-500" />
        ) : type === "error" ? (
          <MdError size={20} className="text-red-500" />
        ) : (
          <span className="loading loading-ring loading-xs"></span>
        )}
        <p className="text-wrap">{message}</p>
      </div>
      <div className="h-full flex flex-col justify-start">
        <button onClick={() => toast.dismiss(t.id)}>
          <IoClose size={20} className="text-red-500" />
        </button>
      </div>
    </main>
  );
};

export default Toast;
