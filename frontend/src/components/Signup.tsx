"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { SignUpInputs } from "@/components";
import { signUpInputsType } from "@/types";

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
    <main className="w-full h-full flex flex-col gap-10 items-center md:px-9">
      <div>
        <h1 className="text-bold text-2xl md:text-3xl lg:text-4xl">Sign Up</h1>
      </div>
      <form className="w-full h-full flex flex-col items-center gap-9">
        <SignUpInputs inputs={inputs} setInputs={setInputs} />
        <motion.button
          onClick={(e) => e.preventDefault()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={pending}
          className="w-full h-10 text-sm font-semibold bg-black dark:bg-white text-white dark:text-black rounded-l-full rounded-r-full disabled:bg-opacity-50 hover:bg-opacity-50 dark:hover:bg-opacity-50"
        >
          Sign up
        </motion.button>
      </form>
      <div
        className={`divider ${theme === "dark" ? "" : "divider-primary opacity-70"}`}
      >
        OR
      </div>
      <div>
        <button>Google</button>
      </div>
    </main>
  );
};

export default Signup;
