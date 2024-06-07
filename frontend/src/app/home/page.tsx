"use client";

import Link from "next/link";

const Home = () => {
  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center gap-10">
      <h1 className="text-2xl font-semibold">Welcome Home</h1>
      <div className="w-full flex items-center justify-evenly">
        <Link className="btn btn-ghost bg-white dark:bg-black" href="/boards">
          Boards
        </Link>
        <Link className="btn btn-ghost bg-white dark:bg-black" href="/auth">
          Login
        </Link>
      </div>
    </main>
  );
};

export default Home;
