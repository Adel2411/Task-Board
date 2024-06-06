"use client";

import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  const handleBoards = () => {
    router.push("/boards");
  };

  const handleAuth = () => {
    router.push("/auth");
  };

  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center gap-10">
      <h1 className="text-2xl font-semibold">Welcome Home</h1>
      <div className="w-full flex items-center justify-evenly">
        <button className="btn" onClick={handleBoards}>
          Boards
        </button>
        <button className="btn" onClick={handleAuth}>
          Login
        </button>
      </div>
    </main>
  );
};

export default Home;
