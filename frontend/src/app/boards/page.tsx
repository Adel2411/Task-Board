"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { GradientDiv } from "@/components";
import { useAuth } from "@/hooks";

const Boards = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const { username, email } = user || {};

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

  const handleLogOut = () => {
    localStorage.removeItem("token");
    location.reload();
  };

  return (
    <main className="h-screen w-screen flex flex-col gap-10  items-center justify-center">
      <div className="rounded-2xl">
        <h1 className="text-3xl font-bold">Boards</h1>
      </div>
      <GradientDiv className="p-1 rounded-2xl">
        <div className="flex flex-col gap-3 justify-center items-center p-3 rounded-2xl bg-background dark:bg-background-dark">
          <p className="text-lg font-semibold">{username}</p>
          <p className="text-lg">{email}</p>
        </div>
      </GradientDiv>
      <GradientDiv className="rounded-lg p-0.5">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogOut}
          className="btn btn-ghost bg-white dark:bg-black"
        >
          Log out
        </motion.button>
      </GradientDiv>
    </main>
  );
};

export default Boards;
