"use client";

import { FaGoogle } from "react-icons/fa";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import { useFormStatus } from "react-dom";
import { SignInInputs } from "@/components";
import { signInInputsType } from "@/types";
import { postLogin } from "@/utils";

const Signin = () => {
  const { theme } = useTheme();
  const { pending } = useFormStatus();
  const [inputs, setInputs] = useState<signInInputsType>({
    auth_identifier: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await postLogin(inputs);
    setInputs({
      auth_identifier: "",
      password: "",
    });
  };

  return (
    <main className="w-full h-full flex flex-col items-center justify-evenly md:px-9">
      <div>
        <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
          Sign In
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center gap-9"
      >
        <SignInInputs inputs={inputs} setInputs={setInputs} />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={pending}
          className="w-full h-10 text-sm font-semibold bg-background-dark dark:bg-background text-background dark:text-background-dark rounded-l-full rounded-r-full disabled:bg-opacity-50 hover:bg-opacity-50 dark:hover:bg-opacity-50"
        >
          Sign in
        </motion.button>
      </form>
      <div
        className={`divider ${theme === "dark" ? "divider-error" : "divider-info"} opacity-50`}
      >
        OR
      </div>
      <div className="w-full flex justify-center">
        <button className="btn btn-ghost w-full  hover:bg-gray-300 dark:hover:bg-gray-700">
          <FaGoogle />
          Sign up with Google
        </button>
      </div>
    </main>
  );
};

export default Signin;
