"use client";

import { FaGoogle } from "react-icons/fa";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { SignUpInputs } from "@/components";
import { signUpInputsType } from "@/types";
import { postRegister } from "@/utils";

const Signup = () => {
  const { theme } = useTheme();
  const { pending } = useFormStatus();
  const [inputs, setInputs] = useState<signUpInputsType>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <main className="w-full h-full flex flex-col gap-5 items-center md:px-9">
      <div>
        <h1 className="text-bold text-2xl md:text-3xl lg:text-4xl">Sign Up</h1>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          postRegister(inputs);
          setInputs({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        }}
        className="w-full h-full flex flex-col items-center gap-9"
      >
        <SignUpInputs inputs={inputs} setInputs={setInputs} />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={pending}
          className="w-full h-10 text-sm font-semibold bg-background-dark dark:bg-background text-background dark:text-background-dark rounded-l-full rounded-r-full disabled:bg-opacity-50 hover:bg-opacity-50 dark:hover:bg-opacity-50"
        >
          Sign up
        </motion.button>
      </form>
      <div
        className={`divider ${theme === "dark" ? "" : "divider-primary opacity-70"}`}
      >
        OR
      </div>
      <div className="w-full h-full flex justify-center">
        <button className="btn btn-ghost w-full  hover:bg-gray-300 dark:hover:bg-gray-700">
          <FaGoogle />
          Sign up with Google
        </button>
      </div>
    </main>
  );
};

export default Signup;
