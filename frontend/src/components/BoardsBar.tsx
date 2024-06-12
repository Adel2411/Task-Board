"use client";

import { motion } from "framer-motion";
import { IoStar } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { GoSignOut } from "react-icons/go";
import { boardsBarProps } from "@/types";
import { useState } from "react";
import AddBoardModal from "./AddBoardModal";

const BoardsBar = ({ user, handleSignOut, favCounter }: boardsBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const getShortCut = (username: string | undefined) => {
    return username
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <main className="flex justify-between items-center w-full h-fit px-5">
      <div className="h-fit flex items-center justify-center gap-3">
        <details className="dropdown dropdown-right dropdown-top md:dropdown-bottom md:dropdown-right">
          <summary className="list-none cursor-pointer">
            <div className="avatar online ">
              <div className="flex justify-center w-12 h-12 bg-background dark:bg-background-dark rounded-lg">
                <p className="w-full h-full flex items-center justify-center">
                  {getShortCut(user?.username)}
                </p>
              </div>
            </div>
          </summary>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.3 },
            }}
            className="dropdown-content rounded-md flex flex-col z-[10] bg-dropdown dark:bg-dropdown-dark w-fit"
          >
            <div className="flex flex-col justify-center gap-2 h-full w-full p-3 pb-8">
              <p className="text-lg font-semibold">{user?.username}</p>
              <p className="opacity-70 text-xs">{user?.email}</p>
            </div>
            <hr className="h-[0.25px] border-t-0 bg-background-dark dark:bg-background opacity-20 dark:opacity-20" />
            <button
              onClick={handleSignOut}
              className="flex justify-center items-center gap-2 p-3 h-full w-full hover:bg-red-500 hover:bg-opacity-70 dark:hover:bg-red-500 dark:hover:bg-opacity-70 rounded-b-md text-sm font-semibold transition-all duration-200 ease-out"
            >
              <GoSignOut />
              Sign out
            </button>
          </motion.div>
        </details>
        <p className="whitespace-nowrap">{user?.username}</p>
      </div>
      <div className="flex items-center gap-3 sm:gap-10 h-fit">
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hover:bg-opacity-70 dark:hover:bg-opacity-70 w-60 flex items-center justify-center gap-1 text-sm text-white p-2 rounded-md bg-primary dark:bg-primary-dark"
        >
          New Board
          <IoIosAddCircle />
        </motion.button>
        <button className="relative p-2 hover:bg-background dark:hover:bg-background-dark rounded-lg">
          <IoStar size={20} />
          {favCounter > 0 && (
            <span className="absolute bg-red-500 text-white px-[6px] py-[2.5px] text-xs font-bold rounded-full -top-3 -right-3">
              {favCounter}
            </span>
          )}
        </button>
      </div>
      <AddBoardModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </main>
  );
};

export default BoardsBar;
