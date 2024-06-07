"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { GradientDiv } from "@/components";
import { User } from "@/types";

const Boards = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

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
    <main className="h-screen w-screen flex flex-col gap-5 items-center justify-center">
      <h1 className="text-3xl font-bold">Boards</h1>
      <GradientDiv className="rounded-xl p-1">
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
