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
    {
      id: "8",
      title: "Board 8",
      description: "Board 8 description",
    },
    {
      id: "9",
      title: "Board 9",
      description: "Board 9 description",
    },
    {
      id: "10",
      title: "Board 10",
      description: "Board 10 description",
    },
    {
      id: "11",
      title: "Board 11",
      description: "Board 11 description",
    },
    {
      id: "12",
      title: "Board 12",
      description: "Board 12 description",
    },
    {
      id: "13",
      title: "Board 13",
      description: "Board 13 description",
    },
    {
      id: "14",
      title: "Board 14",
      description: "Board 14 description",
    },
    {
      id: "15",
      title: "Board 15",
      description: "Board 15 description",
    },
    {
      id: "16",
      title: "Board 16",
      description: "Board 16 description",
    },
    {
      id: "17",
      title: "Board 17",
      description: "Board 17 description",
    },
    {
      id: "18",
      title: "Board 18",
      description: "Board 18 description",
    },
    {
      id: "19",
      title: "Board 19",
      description: "Board 19 description",
    },
    {
      id: "20",
      title: "Board 20",
      description: "Board 20 description",
    },
    {
      id: "21",
      title: "Board 21",
      description: "Board 21 description",
    },
    {
      id: "22",
      title: "Board 22",
      description: "Board 22 description",
    },
    {
      id: "23",
      title: "Board 23",
      description: "Board 23 description",
    },
    {
      id: "24",
      title: "Board 24",
      description: "Board 24 description",
    },
    {
      id: "25",
      title: "Board 25",
      description: "Board 25 description",
    },
    {
      id: "26",
      title: "Board 26",
      description: "Board 26 description",
    },
    {
      id: "27",
      title: "Board 27",
      description: "Board 27 description",
    },
    {
      id: "28",
      title: "Board 28",
      description: "Board 28 description",
    },
    {
      id: "29",
      title: "Board 29",
      description: "Board 29 description",
    },
    {
      id: "30",
      title: "Board 30",
      description: "Board 30 description",
    },
    {
      id: "31",
      title: "Board 31",
      description: "Board 31 description",
    },
    {
      id: "32",
      title: "Board 32",
      description: "Board 32 description",
    },
    {
      id: "33",
      title: "Board 33",
      description: "Board 33 description",
    },
    {
      id: "34",
      title: "Board 34",
      description: "Board 34 description",
    },
    {
      id: "35",
      title: "Board 35",
      description: "Board 35 description",
    },
    {
      id: "36",
      title: "Board 36",
      description: "Board 36 description",
    },
    {
      id: "37",
      title: "Board 37",
      description: "Board 37 description",
    },
    {
      id: "38",
      title: "Board 38",
      description: "Board 38 description",
    },
    {
      id: "39",
      title: "Board 39",
      description: "Board 39 description",
    },
    {
      id: "40",
      title: "Board 40",
      description: "Board 40 description",
    },
    {
      id: "41",
      title: "Board 41",
      description: "Board 41 description",
    },
    {
      id: "42",
      title: "Board 42",
      description: "Board 42 description",
    },
    {
      id: "43",
      title: "Board 43",
      description: "Board 43 description",
    },
    {
      id: "44",
      title: "Board 44",
      description: "Board 44 description",
    },
    {
      id: "45",
      title: "Board 45",
      description: "Board 45 description",
    },
    {
      id: "46",
      title: "Board 46",
      description: "Board 46 description",
    },
    {
      id: "47",
      title: "Board 47",
      description: "Board 47 description",
    },
    {
      id: "48",
      title: "Board 48",
      description: "Board 48 description",
    },
    {
      id: "49",
      title: "Board 49",
      description: "Board 49 description",
    },
    {
      id: "50",
      title: "Board 50",
      description: "Board 50 description",
    },
    {
      id: "51",
      title: "Board 51",
      description: "Board 51 description",
    },
    {
      id: "52",
      title: "Board 52",
      description: "Board 52 description",
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
      <div className="hidden md:flex md:items-end w-full h-1/6">
        <BoardsBar
          user={user}
          handleSignOut={handleSignOut}
          favCounter={favCounter}
        />
      </div>
      <div className="bg-background dark:bg-background-dark shadow-[0_0_80px] shadow-background dark:shadow-background-dark grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:rounded-xl content-start place-items-center gap-y-[32px] h-5/6 w-full p-5 pt-16 overflow-y-auto">
        {boards.map((board) => (
          <BoardCard
            key={board.id}
            board={board}
            favCounter={favCounter}
            setFavCounter={setFavCounter}
          />
        ))}
      </div>
      <div className="flex items-start md:hidden w-full h-1/6">
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
