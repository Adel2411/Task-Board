"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { GradientDiv, BoardCard, BoardsBar } from "@/components";
import { useAuth } from "@/hooks";

const Boards = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, setIsAuthorized } = useAuth();
  const { username, email } = user || {};
  const boards = [
    {
      id: 1,
      title: "Board 1",
      description: "Board 1 description",
    },
    {
      id: 2,
      title: "Board 2",
      description: "Board 2 description",
    },
    {
      id: 3,
      title: "Board 3",
      description: "Board 3 description",
    },
    {
      id: 4,
      title: "Board 4",
      description: "Board 4 description",
    },
    {
      id: 5,
      title: "Board 5",
      description: "Board 5 description",
    },
    {
      id: 6,
      title: "Board 6",
      description: "Board 6 description",
    },
    {
      id: 7,
      title: "Board 7",
      description: "Board 7 description",
    },
    {
      id: 8,
      title: "Board 8",
      description: "Board 8 description",
    },
    {
      id: 9,
      title: "Board 9",
      description: "Board 9 description",
    },
    {
      id: 10,
      title: "Board 10",
      description: "Board 10 description",
    },
  ];

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token && !localStorage.getItem("token")) {
      router.push("/home");
    } else if (token) {
      localStorage.setItem("token", token);
      const params = new URLSearchParams(searchParams);
      params.delete("token");
      const newUrl = `/boards?${params.toString()}`;
      router.replace(newUrl);
    }
  }, [searchParams, router]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsAuthorized(false);
  };

  return (
    <main className="h-screen w-screen flex flex-col gap-10  items-center md:p-10 bg-white dark:bg-black">
      <div className="hidden md:flex border-2">
        <BoardsBar />
      </div>
      <div className="bg-background dark:bg-background-dark shadow-2xl shadow-background dark:shadow-background-dark grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:rounded-xl content-start place-items-center gap-y-[32px] h-5/6 w-full p-5 pt-16 overflow-y-auto">
        {boards.map((board) => (
          <BoardCard key={board.id} />
        ))}
      </div>
      <div className="flex md:hidden border-2">
        <BoardsBar />
      </div>
    </main>
  );
};

export default Boards;
