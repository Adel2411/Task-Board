"use client";

import { motion } from "framer-motion";
import { Board, Task, jwtPayloadType } from "@/types";
import { getBoard, getPublicBoard } from "@/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { IoAdd } from "react-icons/io5";
import { buttonVariants } from "@/animations";
import { TaskModal, Tasks } from "@/components";
import { jwtDecode } from "jwt-decode";

const BoardTasks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { id }: { id: string } = useParams();
  const [isOwner, setIsOwner] = useState(false);
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchBoard = async () => {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (token) {
        const response: Board | null = await getBoard(token, id);

        if (response) {
          setBoard(response);
          setTasks(response.tasks as Task[]);
          const payload: jwtPayloadType = jwtDecode(token);
          const result = payload._id === response.owner;
          setIsOwner(result);
          setLoading(false);
          return;
        }
      }

      // Only fetch the public board if the user is not the owner
      const response: Board | null = await getPublicBoard(id);
      if (response) {
        setBoard(response);
        setTasks(response.tasks as Task[]);
      }

      setLoading(false);
    };

    fetchBoard();
  }, [id]);

  if (loading) {
    return (
      <main className="w-full h-full flex flex-col justify-center items-center gap-16">
        <div className="loading loading-spinner loading-lg"></div>
      </main>
    );
  }

  if (!isOwner && !board?.is_public) {
    return (
      <main className="w-full h-full flex flex-col justify-center items-center gap-16">
        <div className="w-[80%] md:w-[60%] mt-16 h-fit flex flex-col gap-3">
          <h1 className="font-semibold w-full text-center text-xl sm:text-2xl lg:text-3xl">
            Private Board
          </h1>
          <p className="w-full text-center opacity-50">
            This board is private. You do not have permission to view its
            content.
          </p>
        </div>
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="text-xs md:text-sm fixed top-4 left-4 px-4 py-2 rounded-xl bg-white dark:bg-black"
        >
          <Link
            href="/home"
            className="w-full h-full flex items-center justify-center gap-2"
          >
            <RiArrowGoBackFill />
            Go back to home
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="w-full h-full flex flex-col justify-center items-center gap-16">
      <>
        <div className="w-[80%] md:w-[60%] mt-16 h-fit flex flex-col">
          <h1 className="font-semibold w-full text-center text-xl sm:text-2xl lg:text-3xl">
            {board?.name}
          </h1>
          <p className="w-full text-center opacity-50">{board?.description}</p>
        </div>
        <div className="bg-primary bg-opacity-5 dark:bg-primary-dark dark:bg-opacity-5 w-full h-full overflow-auto flex justify-center">
          <Tasks tasks={tasks} setTasks={setTasks} isOwner={isOwner} />
        </div>
        {isOwner ? (
          <>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="text-xs md:text-sm fixed top-4 left-4 px-4 py-2 rounded-xl bg-white dark:bg-black"
            >
              <Link
                href="/boards"
                className="w-full h-full flex items-center justify-center gap-2"
              >
                <RiArrowGoBackFill />
                Go back to boards
              </Link>
            </motion.div>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="text-xs md:text-sm fixed bottom-14 right-14 p-4 rounded-xl bg-primary dark:bg-primary-dark"
              onClick={() => setIsOpen(true)}
            >
              <IoAdd size={30} />
            </motion.button>
            <TaskModal
              isOpen={isOpen}
              closeModal={() => setIsOpen(false)}
              type="add"
              setTasks={setTasks}
              id={board?._id}
            />
          </>
        ) : (
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="text-xs md:text-sm fixed top-4 left-4 px-4 py-2 rounded-xl bg-white dark:bg-black"
          >
            <Link
              href="/home"
              className="w-full h-full flex items-center justify-center gap-2"
            >
              <RiArrowGoBackFill />
              Go back to home
            </Link>
          </motion.div>
        )}
      </>
    </main>
  );
};

export default BoardTasks;
