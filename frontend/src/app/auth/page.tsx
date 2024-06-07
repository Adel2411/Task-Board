"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useState } from "react";
import { Signin, Signup } from "@/components";
import { gradientBackground, gradientBackgroundDark } from "@/animations";

export default function Login() {
  const { theme } = useTheme();
  const [showSignin, setShowSignin] = useState(true);

  return (
    <main className="w-screen h-screen flex justify-center items-center bg-center bg-cover bg-[url('/auth_page_bg_light.png')] dark:bg-[url('/auth_page_bg_dark.png')]">
      <motion.div
        initial="initial"
        animate="animate"
        variants={
          theme === "dark" ? gradientBackgroundDark : gradientBackground
        }
        className={`flex justify-center items-center w-full md:w-2/3 lg:w-1/2 2xl:w-1/3 mx-5 h-5/6 rounded-3xl p-1`}
      >
        <div className="bg-auth_bg text-black dark:bg-auth_bg-dark dark:text-white w-full h-full rounded-3xl flex flex-col gap-5 p-5 lg:pt-10 xl:pt-16 items-center">
          <div className=" w-full flex items-center">
            <button
              className={`py-3 w-1/2 h-full rounded-l-xl text-white dark:text-black ${!showSignin ? "" : "bg-opacity-25 dark:bg-opacity-25"} bg-black dark:bg-white`}
              onClick={() => setShowSignin(false)}
            >
              Sign up
            </button>
            <button
              className={`py-3 w-1/2 h-full rounded-r-xl text-white dark:text-black ${showSignin ? "" : "bg-opacity-25 dark:bg-opacity-25"} bg-black dark:bg-white`}
              onClick={() => setShowSignin(true)}
            >
              Sign in
            </button>
          </div>
          {showSignin ? <Signin /> : <Signup />}
        </div>
      </motion.div>
    </main>
  );
}
