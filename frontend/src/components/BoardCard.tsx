"use client";

import { motion } from "framer-motion";
import { SlOptionsVertical } from "react-icons/sl";
import { IoStarOutline, IoStar, IoEnterOutline } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";
import { useState } from "react";
import { boardCardProps } from "@/types";

const BoardCard = ({ board, favCounter, setFavCounter }: boardCardProps) => {
  const [isFav, setIsFav] = useState(false);

  const handleFav = () => {
    setIsFav(!isFav);
    setFavCounter(isFav ? favCounter - 1 : favCounter + 1);
  };

  return (
    <main className="shadow-[0_0_50px] shadow-white dark:shadow-black flex flex-col justify-center gap-4 bg-white dark:bg-black rounded-2xl p-3 w-[190px] h-[238px]">
      <div className="flex justify-end">
        <button className="p-2 rounded-full hover:bg-background dark:hover:bg-background-dark">
          <SlOptionsVertical />
        </button>
      </div>
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="group h-full flex justify-center items-center rounded-xl hover:bg-background dark:hover:bg-background-dark"
      >
        <div className="group-hover:flex group-hover:items-center group-hover:justify-center group-hover:gap-3 hidden text-lg font-bold">
          <p>Enter Board</p>
          <IoEnterOutline size={20} />
        </div>
        <FaTasks size={80} className="group-hover:hidden" />
      </motion.button>
      <div className="flex items-center justify-between">
        <p>{board.title}</p>
        <button
          className={`p-1 rounded-full ${isFav && "text-primary dark:text-primary-dark"}`}
          onClick={handleFav}
        >
          {isFav ? <IoStar /> : <IoStarOutline />}
        </button>
      </div>
    </main>
  );
};

export default BoardCard;
