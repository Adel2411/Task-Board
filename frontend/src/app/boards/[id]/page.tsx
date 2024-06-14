"use client";

import { Board } from "@/types";
import { getBoard, getPublicBoard } from "@/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BoardTasks = () => {
  const { id }: { id: string } = useParams();
  const [isOwner, setIsOwner] = useState(false);
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoard = async () => {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (token) {
        const response: Board | null = await getBoard(token, id);

        if (response) {
          setBoard(response);
          setIsOwner(true);
          setLoading(false);
          return;
        }
      }

      // Only fetch the public board if the user is not the owner
      const response: Board | null = await getPublicBoard(id);
      if (response) {
        setBoard(response);
      }

      setLoading(false);
    };

    fetchBoard();
  }, [id]);

  useEffect(() => {
    if (board && isOwner) {
      console.log("Owner", isOwner);
    } else if (board && !isOwner) {
      console.log("not Owner", isOwner);
    }
  }, [board, isOwner]);

  return (
    <main>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>{board?.name}</h1>
          <p>{board?.description}</p>
        </div>
      )}
    </main>
  );
};

export default BoardTasks;
