"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BoardCard, BoardsBar, Toast } from "@/components";
import { useAuth } from "@/hooks";
import toast from "react-hot-toast";
import { getBoards } from "@/utils";
import { Board } from "@/types";

const Boards = () => {
  const [boards, setBoards] = useState<Board[]>([]);
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
      const response: Board[] | null = await getBoards(token);
      if (response) {
        setBoards(response);
      }
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
        />
      </div>
      <div className="p-28 h-[90%] bg-background dark:bg-background-dark shadow-[0_0_80px] shadow-background dark:shadow-background-dark grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:rounded-xl content-start place-items-center gap-y-[32px] w-full overflow-y-auto">
        {boards.map((board) => (
          <BoardCard
            key={board._id}
            board={board}
            favCounter={favCounter}
            setFavCounter={setFavCounter}
          />
        ))}
      </div>
      <div className="flex items-start md:hidden w-full h-[10%]">
        <BoardsBar
          user={user}
          handleSignOut={handleSignOut}
          favCounter={favCounter}
        />
      </div>
    </main>
  );
};

export default Boards;
