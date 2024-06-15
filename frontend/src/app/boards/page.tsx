"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BoardCard, BoardsBar, Toast } from "@/components";
import { useAuth } from "@/hooks";
import toast from "react-hot-toast";
import { getBoards } from "@/utils";
import { Board } from "@/types";

// Fallback component for Suspense
const LoadingFallback = () => (
  <div className="w-full h-full flex justify-center items-center">
    <span className="loading loading-spinner loading-lg"></span>
  </div>
);

const BoardsContent = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, setIsAuthorized } = useAuth();
  const [favCounter, setFavCounter] = useState(0);

  useEffect(() => {
    const fetchBoards = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/home");
        return;
      }
      setIsLoading(true);
      const response: Board[] | null = await getBoards(token);
      if (response) {
        setBoards(response);
      }
      setIsLoading(false);
    };

    fetchBoards();
  }, []);

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

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsAuthorized(false);
    toast.custom((t) => (
      <Toast type="success" message="Signed out Successfully" t={t} />
    ));
  };

  return (
    <main className="h-screen w-screen flex flex-col gap-10  items-center md:p-10 bg-white dark:bg-black">
      <div className="hidden md:flex md:items-end w-full h-[10%]">
        <BoardsBar
          user={user}
          handleSignOut={handleSignOut}
          favCounter={favCounter}
          setBoards={setBoards}
        />
      </div>
      <div className="p-28 h-[90%] bg-background dark:bg-background-dark shadow-[0_0_80px] shadow-background dark:shadow-background-dark grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:rounded-xl content-start place-items-center gap-y-[32px] w-full overflow-y-auto">
        {isLoading ? (
          <>
            <div className="skeleton w-[190px] h-[238px] bg-gray-300 dark:bg-gray-800"></div>
            <div className="skeleton w-[190px] h-[238px] bg-gray-300 dark:bg-gray-800"></div>
            <div className="skeleton w-[190px] h-[238px] bg-gray-300 dark:bg-gray-800"></div>
            <div className="skeleton w-[190px] h-[238px] bg-gray-300 dark:bg-gray-800"></div>
            <div className="skeleton w-[190px] h-[238px] bg-gray-300 dark:bg-gray-800"></div>
            <div className="skeleton w-[190px] h-[238px] bg-gray-300 dark:bg-gray-800"></div>
            <div className="skeleton w-[190px] h-[238px] bg-gray-300 dark:bg-gray-800"></div>
            <div className="skeleton w-[190px] h-[238px] bg-gray-300 dark:bg-gray-800"></div>
          </>
        ) : (
          boards.map((board) => (
            <BoardCard
              key={board._id}
              board={board}
              favCounter={favCounter}
              setFavCounter={setFavCounter}
              setBoards={setBoards}
            />
          ))
        )}
      </div>
      <div className="flex items-start md:hidden w-full h-[10%]">
        <BoardsBar
          user={user}
          handleSignOut={handleSignOut}
          favCounter={favCounter}
          setBoards={setBoards}
        />
      </div>
    </main>
  );
};

const Boards = () => {
  if (typeof window !== "undefined") {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <BoardsContent />
      </Suspense>
    );
  }
};

export default Boards;
