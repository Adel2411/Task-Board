"use client";

import { motion } from "framer-motion";
import { SlOptionsVertical } from "react-icons/sl";
import { IoStarOutline, IoStar, IoEnterOutline } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";
import { useState } from "react";
import { boardCardProps } from "@/types";
import DropDownMenu from "./DropDownMenu";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import { BoardModal, ShareModal, Toast } from "@/components";
import { deleteBoard, toggleBoardPrivacy } from "@/utils";
import ConfirmToast from "@/components/ConfirmToast";
import { useRouter } from "next/navigation";

const BoardCard = ({
  board,
  favCounter,
  setFavCounter,
  setBoards,
}: boardCardProps) => {
  const { theme } = useTheme();
  const router = useRouter();
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [isPrivate, setIsPrivate] = useState(board.is_public || false);
  const shareLink = `${window.location.origin}/boards/${board._id}`;

  const handleFav = () => {
    setIsFav(!isFav);
    setFavCounter(isFav ? favCounter - 1 : favCounter + 1);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleShare = () => {
    setIsShare(true);
  };

  const handlePrivacy = async () => {
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found");
      toast.custom((t) => (
        <Toast type="error" message="No token found" t={t} />
      ));
      setLoading(false);
      return;
    }

    const response = await toggleBoardPrivacy(
      token,
      board._id,
      {
        name: board.name,
        description: board.description,
      },
      isPrivate,
    );

    if (response) {
      setIsPrivate(!isPrivate);
      setBoards((prevBoards) =>
        prevBoards.map((b) =>
          b._id === board._id ? { ...b, is_public: !isPrivate } : b,
        ),
      );
      toast.custom((t) => (
        <Toast
          type="success"
          message={`Board is now ${isPrivate ? "private" : "public"}`}
          t={t}
        />
      ));
    } else {
      toast.custom((t) => (
        <Toast type="error" message="Failed to update board privacy" t={t} />
      ));
    }

    setLoading(false);
  };

  const handleDelete = () => {
    toast.custom((t) => (
      <ConfirmToast
        t={t}
        message="Are you sure you want to delete this board?"
        onConfirm={async () => {
          setLoading(true);

          const token = localStorage.getItem("token");
          if (!token) {
            console.log("No token found");
            toast.custom((t) => (
              <Toast type="error" message="No token found" t={t} />
            ));
            setLoading(false);
            return;
          }

          const response = await deleteBoard(token, board._id);

          if (response) {
            setBoards((prevBoards) =>
              prevBoards.filter((b) => b._id !== board._id),
            );
          }

          toast.custom((t) => (
            <Toast
              type={response ? "success" : "error"}
              message={
                response
                  ? "Board deleted successfully"
                  : "Failed to delete board"
              }
              t={t}
            />
          ));
          setLoading(false);
          toast.dismiss(t.id);
        }}
      />
    ));
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 100 }}
      whileHover={{
        y: 5,
        boxShadow:
          theme === "light"
            ? "0px 5px 15px rgba(255, 255, 255, 0.35)"
            : "0px 5px 10px rgba(0, 0, 0, 0.35)",
        transition: { duration: 0.2 },
      }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
      className="flex flex-col justify-center gap-4 bg-white dark:bg-black rounded-2xl p-3 w-[190px] h-[238px]"
    >
      <div className="flex justify-end">
        <div className="dropdown dropdown-end dropdown-right">
          <div
            tabIndex={0}
            role="button"
            className="p-2 rounded-full hover:bg-background dark:hover:bg-background-dark"
          >
            <SlOptionsVertical />
          </div>
          <DropDownMenu
            isPrivate={isPrivate}
            loading={loading}
            handleEdit={() => handleEdit()}
            handleShare={() => handleShare()}
            handlePrivacy={() => handlePrivacy()}
            handleDelete={() => handleDelete()}
          />
        </div>
      </div>
      <motion.button
        onClick={() => router.push(`/boards/${board._id}`)}
        whileTap={{ scale: 0.9 }}
        className="group h-full flex justify-center items-center rounded-xl hover:bg-background dark:hover:bg-background-dark"
      >
        <div className="group-hover:flex group-hover:items-center group-hover:justify-center group-hover:gap-3 hidden text-lg font-bold">
          <p>Access Board</p>
          <IoEnterOutline size={20} />
        </div>
        <FaTasks size={80} className="group-hover:hidden" />
      </motion.button>
      <div className="flex items-center justify-between">
        <p>{board.name}</p>
        <button
          className={`p-1 rounded-full ${isFav && "text-primary dark:text-primary-dark"}`}
          onClick={handleFav}
        >
          {isFav ? <IoStar /> : <IoStarOutline />}
        </button>
      </div>
      <BoardModal
        isOpen={isEdit}
        closeModal={() => setIsEdit(false)}
        type="edit"
        setBoards={setBoards}
        board={board}
      />
      <ShareModal
        isOpen={isShare}
        closeModal={() => setIsShare(false)}
        link={shareLink}
      />
    </motion.main>
  );
};

export default BoardCard;
