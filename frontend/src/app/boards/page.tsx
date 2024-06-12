"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BoardCard, BoardsBar, Toast } from "@/components";
import { useAuth } from "@/hooks";
import toast from "react-hot-toast";

const Boards = () => {
  const boards = [
    {
      id: "1",
      title: "Board 1",
      description: "Board 1 description",
    },
    {
      id: "2",
      title: "Board 2",
      description: "Board 2 description",
    },
    {
      id: "3",
      title: "Board 3",
      description: "Board 3 description",
    },
    {
      id: "4",
      title: "Board 4",
      description: "Board 4 description",
    },
    {
      id: "5",
      title: "Board 5",
      description: "Board 5 description",
    },
    {
      id: "6",
      title: "Board 6",
      description: "Board 6 description",
    },
    {
      id: "7",
      title: "Board 7",
      description: "Board 7 description",
    },
  ];
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, setIsAuthorized } = useAuth();
  const [favCounter, setFavCounter] = useState(0);

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
      <div className="h-[90%] bg-background dark:bg-background-dark shadow-[0_0_80px] shadow-background dark:shadow-background-dark grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:rounded-xl content-start place-items-center gap-y-[32px] w-full p-5 pt-16 overflow-y-auto">
        {boards.map((board) => (
          <BoardCard
            key={board.id}
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
