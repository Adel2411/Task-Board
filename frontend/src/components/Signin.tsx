"use client";

import { FaGoogle } from "react-icons/fa";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import { SignInInputs } from "@/components";
import { signInInputsType } from "@/types";
import { postLogin } from "@/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Signin = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState<signInInputsType>({
    auth_identifier: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const response = await postLogin(inputs);

    if (response.token) {
      // Successful login
      localStorage.setItem("token", response.token);
      toast.success("Login successful!", {
        duration: 5000,
      });
      setInputs({
        auth_identifier: "",
        password: "",
      });
      router.push("/boards");
    } else {
      // Handle different types of errors
      toast.error(response, {
        duration: 5000,
      });

      if (response === "Response is not OK") {
        setInputs({
          auth_identifier: "",
          password: "",
        });
      }
    }

    setLoading(false);
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
          whileHover={loading ? { scale: 1 } : { scale: 1.05 }}
          whileTap={loading ? { scale: 1 } : { scale: 0.95 }}
          disabled={loading}
          className={`w-full h-10 text-sm font-semibold bg-background-dark dark:bg-background text-background dark:text-background-dark rounded-l-full rounded-r-full ${loading ? "flex justify-center items-center gap-5 bg-opacity-25 dark:bg-opacity-25 cursor-not-allowed" : "hover:bg-opacity-50 dark:hover:bg-opacity-50"}`}
        >
          {loading && (
            <span className="loading loading-spinner loading-xs"></span>
          )}
          {loading ? "Signing in" : "Sign in"}
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
          Sign in with Google
        </button>
      </div>
    </main>
  );
};

export default Signin;
