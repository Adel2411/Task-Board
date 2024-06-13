"use client";

import { FaGoogle } from "react-icons/fa";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useState } from "react";
import { SignInInputs, Toast } from "@/components";
import { loadingProps, signInInputsType } from "@/types";
import { getUser, postLogin } from "@/utils";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks";
import Link from "next/link";
import { buttonVariants } from "@/animations";

const Signin = ({ loading, setLoading }: loadingProps) => {
  const { theme } = useTheme();
  const { setIsAuthorized, setUser } = useAuth();
  const [inputs, setInputs] = useState<signInInputsType>({
    auth_identifier: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const response = await postLogin(inputs);

    if (response.token) {
      // Successful Sign in
      localStorage.setItem("token", response.token);
      toast.custom((t) => (
        <Toast t={t} message="Successfuly Signed in" type="success" />
      ));
      setInputs({
        auth_identifier: "",
        password: "",
      });
      setIsAuthorized(true);
      const user = await getUser(response.token);
      setUser(user);
    } else {
      // Handle different types of errors
      toast.custom((t) => <Toast t={t} message={response} type="error" />);

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
    <main className="w-full h-full flex flex-col justify-evenly md:px-9">
      <div className="w-full flex justify-center">
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
          variants={buttonVariants}
          whileHover={loading ? { scale: 1 } : "hover"}
          whileTap={loading ? { scale: 1 } : "tap"}
          disabled={loading}
          className={`w-full h-10 text-sm font-semibold bg-background-dark dark:bg-background text-background dark:text-background-dark rounded-l-full rounded-r-full ${loading && "flex justify-center items-center gap-5 bg-opacity-25 dark:bg-opacity-25 cursor-not-allowed"}`}
        >
          {loading && (
            <span className="loading loading-spinner loading-xs"></span>
          )}
          {loading ? "Signing in" : "Sign in"}
        </motion.button>
      </form>
      <div className="">
        <Link
          href="/forgot-password"
          className={`${loading ? "pointer-events-none opacity-60" : "link link-hover link-accent dark:link-error"} text-sm`}
          aria-disabled={loading}
        >
          Forgot password ?
        </Link>
      </div>
      <div
        className={`divider ${theme === "dark" ? "divider-error" : "divider-accent"} opacity-50`}
      >
        OR
      </div>
      <div className="w-full flex justify-center">
        <button
          className={`btn btn-ghost w-full ${!loading && "hover:bg-gray-300 dark:hover:bg-gray-700"}`}
          disabled={loading}
        >
          <FaGoogle />
          Sign in with Google
        </button>
      </div>
    </main>
  );
};

export default Signin;
