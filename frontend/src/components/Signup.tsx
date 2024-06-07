"use client";

import { FaGoogle } from "react-icons/fa";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import { SignUpInputs } from "@/components";
import { signUpInputsType } from "@/types";
import { postRegister } from "@/utils";
import toast from "react-hot-toast";

const Signup = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState<signUpInputsType>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const response = await postRegister(inputs);

    if (
      response ===
      "We have sent you a confirmation email. Please verify your email address"
    ) {
      toast.success(response, {
        duration: 5000,
      });
      setInputs({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      if (response === "Response is not OK") {
        setInputs({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
      toast.error(response, {
        duration: 5000,
      });
    }

    setLoading(false);
  };

  return (
    <main className="w-full h-full flex flex-col justify-evenly items-center md:px-9">
      <div>
        <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
          Sign Up
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center gap-9"
      >
        <SignUpInputs inputs={inputs} setInputs={setInputs} />
        <motion.button
          type="submit"
          whileHover={loading ? { scale: 1 } : { scale: 1.05 }}
          whileTap={loading ? { scale: 1 } : { scale: 0.95 }}
          disabled={loading}
          className={`w-full h-10 text-sm font-semibold bg-background-dark dark:bg-background text-background dark:text-background-dark rounded-l-full rounded-r-full ${loading ? "flex justify-center items-center gap-5 bg-opacity-25 dark:bg-opacity-25 cursor-not-allowed" : "hover:bg-opacity-50 dark:hover:bg-opacity-50"}`}
        >
          {loading && (
            <span className="loading loading-spinner loading-xs"></span>
          )}
          {loading ? "Signing up" : "Sign up"}
        </motion.button>
      </form>
      <div
        className={`divider ${theme === "dark" ? "divider-error" : "divider-accent"} opacity-50`}
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

export default Signup;
