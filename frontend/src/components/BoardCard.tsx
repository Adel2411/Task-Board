"use client";

import { SlOptionsVertical } from "react-icons/sl";
import { IoStarOutline, IoStar } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";
import { useState } from "react";
import { boardCardProps } from "@/types";

const BoardCard = ({ board }: boardCardProps) => {
  const [isFav, setIsFav] = useState(false);

  return (
    <main className="shadow-[0_0_50px] shadow-white dark:shadow-black flex flex-col justify-center gap-4 bg-white dark:bg-black rounded-2xl p-3 w-[190px] h-[238px]">
      <div className="flex justify-end">
        <button className="p-1 rounded-full bg-background dark:bg-background-dark">
          <SlOptionsVertical />
        </button>
      </div>
      <div className="h-full flex justify-center items-center">
        <FaTasks size={80} />
      </div>
      <div className="flex items-center justify-between">
        <p>{board.title}</p>
        <button
          className={`p-1 rounded-full ${isFav && "text-primary dark:text-primary-dark"}`}
          onClick={() => {
            setIsFav(!isFav);
          }}
        >
          {isFav ? <IoStar /> : <IoStarOutline />}
        </button>
      </div>
    </main>
  );
};

export default BoardCard;
