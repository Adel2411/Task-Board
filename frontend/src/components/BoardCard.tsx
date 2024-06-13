"use client";

import { motion } from "framer-motion";
import { SlOptionsVertical } from "react-icons/sl";
import { IoStarOutline, IoStar, IoEnterOutline } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";
import { useState } from "react";
import { boardCardProps } from "@/types";
import DropDownMenu from "./DropDownMenu";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import { BoardModal, Toast } from "@/components";
import { deleteBoard } from "@/utils";

const BoardCard = ({ board, favCounter, setFavCounter }: boardCardProps) => {
  const { theme } = useTheme();
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleFav = () => {
    setIsFav(!isFav);
    setFavCounter(isFav ? favCounter - 1 : favCounter + 1);
  };

  const handleEdit = (id: string) => {
    console.log("Edit", id);
    setIsEdit(true);
  };

  const handleShare = (id: string) => {
    console.log("share", id);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found");
      return;
    }

    const response = await deleteBoard(token, id);

    toast.custom((t) => (
      <Toast
        type={response ? "success" : "error"}
        message={
          response ? "Board deleted successfully" : "Failed to delete board"
        }
        t={t}
      />
    ));
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 100 }}
      whileHover={{
        y: 10,
        boxShadow:
          theme === "dark"
            ? "0px -5px 10px rgba(255, 255, 255, 0.25)"
            : "0px -5px 10px rgba(0, 0, 0, 0.25)",
        transition: { duration: 0.3 },
      }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
      className="flex flex-col justify-center gap-4 bg-white dark:bg-black rounded-2xl p-3 w-[190px] h-[238px]"
    >
      <div className="flex justify-end">
        <div className="dropdown dropdown-end dropdown-left">
          <div
            tabIndex={0}
            role="button"
            className="p-2 rounded-full hover:bg-background dark:hover:bg-background-dark"
          >
            <SlOptionsVertical />
          </div>
          <DropDownMenu
            loading={loading}
            id={board._id}
            handleEdit={handleEdit}
            handleShare={handleShare}
            handleDelete={handleDelete}
          />
        </div>
      </div>
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="group h-full flex justify-center items-center rounded-xl hover:bg-background dark:hover:bg-background-dark"
      >
        <div className="group-hover:flex group-hover:items-center group-hover:justify-center group-hover:gap-3 hidden text-lg font-bold">
          <p>Access Board</p>
          <IoEnterOutline size={20} />
        </div>
        <FaTasks size={80} className="group-hover:hidden" />
      </motion.button>
      <div className="flex items-center justify-between">
        <p>{board.name}</p>
        <button
          className={`p-1 rounded-full ${isFav && "text-primary dark:text-primary-dark"}`}
          onClick={handleFav}
        >
          {isFav ? <IoStar /> : <IoStarOutline />}
        </button>
      </div>
      <BoardModal
        isOpen={isEdit}
        closeModal={() => setIsEdit(false)}
        type="edit"
        board={board}
      />
    </motion.main>
  );
};

export default BoardCard;
