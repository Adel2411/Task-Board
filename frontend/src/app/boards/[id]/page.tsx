"use client";

import { useParams } from "next/navigation";

const BoardTasks = () => {
  const params = useParams();
  const id = params.id;

  return (
    <div>
      <h1>BoardIdPage</h1>
      <p>BoadId = {id}</p>
    </div>
  );
};

export default BoardTasks;
