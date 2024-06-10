import { IoStar } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { boardsBarProps } from "@/types";

const BoardsBar = ({ user, handleSignOut }: boardsBarProps) => {
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
        <div className="relative w-full group">
          <button className="peer">
            <div className="avatar online ">
              <div className="flex justify-center w-12 h-12 bg-background dark:bg-background-dark rounded-lg">
                <p className="w-full h-full flex items-center justify-center">
                  {getShortCut(user?.username)}
                </p>
              </div>
            </div>
          </button>
          <div className="border-[1px] border-gray-300 dark:border-gray-700 p-1 pb-5 flex flex-col gap-8 absolute z-[10] max-md:bottom-[100%] md:top-[100%] left-[100%] bg-background dark:bg-background-dark rounded-md overflow-hidden shadow-2xl shadow-background dark:shadow-background-dark w-[200px] peer-focus:visible peer-focus:opacity-100 opacity-0 invisible duration-200 text-xs">
            <div className="flex flex-col justify-center items-center gap-2 h-full w-full p-2">
              <p className="text-lg font-semibold">{user?.username}</p>
              <p>{user?.email}</p>
            </div>
            <hr className="h-[0.25px] border-t-0 bg-background-dark dark:bg-background opacity-20 dark:opacity-20" />
            <button
              onClick={handleSignOut}
              className="p-2 h-full w-full hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white  bg-gray-300 dark:bg-gray-700 rounded-md"
            >
              Sign out
            </button>
          </div>
        </div>
        <p className="whitespace-nowrap">{user?.username}</p>
      </div>
      <div className="flex items-center gap-3 sm:gap-10 h-fit">
        <button className="flex items-center gap-1 text-sm text-white p-2 rounded-lg bg-primary dark:bg-primary-dark">
          <p>New Board</p>
          <IoIosAddCircle />
        </button>
        <IoStar size={20} />
      </div>
    </main>
  );
};

export default BoardsBar;
