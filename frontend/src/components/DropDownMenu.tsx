import { dropDownMenuProps } from "@/types";
import {
  MdOutlineEdit,
  MdOutlineIosShare,
  MdDeleteOutline,
} from "react-icons/md";

const DropDownMenu = ({
  loading,
  handleEdit,
  handleShare,
  handleDelete,
}: dropDownMenuProps) => {
  return (
    <div
      className={`${loading && "opacity-50"} rounded-md bg-dropdown w-[100px] dark:bg-dropdown-dark dropdown-content z-[10] font-light`}
    >
      <button
        disabled={loading}
        onClick={() => handleEdit()}
        className="disabled:cursor-not-allowed flex items-center justify-start gap-2 rounded-t-md p-2 w-full h-full hover:bg-yellow-500 hover:bg-opacity-20"
      >
        <MdOutlineEdit />
        Edit
      </button>
      <button
        disabled={loading}
        onClick={() => handleShare()}
        className="disabled:cursor-not-allowed flex items-center justify-start gap-2 p-2 w-full h-full hover:bg-blue-500 hover:bg-opacity-20"
      >
        <MdOutlineIosShare />
        Share
      </button>
      <hr className="h-[0.25px] border-t-0 bg-background-dark dark:bg-background opacity-20 dark:opacity-20" />
      <button
        disabled={loading}
        onClick={() => handleDelete()}
        className="disabled:cursor-not-allowed flex items-center justify-start gap-2 rounded-b-md p-2 w-full h-full hover:bg-red-500 hover:bg-opacity-20"
      >
        <MdDeleteOutline />
        Delete
      </button>
    </div>
  );
};

export default DropDownMenu;
