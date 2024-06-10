"use client";

import { GradientDiv } from "@/components";
import Link from "next/link";

const Home = () => {
  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-semibold">Welcome Home</h1>
      <GradientDiv className="rounded-xl p-1">
        <Link className="btn btn-ghost bg-white dark:bg-black" href="/auth">
          Sign In
        </Link>
      </GradientDiv>
    </main>
  );
};

export default Home;
