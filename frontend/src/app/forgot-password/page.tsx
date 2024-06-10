"use client";

import { motion } from "framer-motion";
import { ForgotPasswordInputs, GradientDiv, EmailSent } from "@/components";
import { useState } from "react";
import Link from "next/link";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { postForgotPassword } from "@/utils";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setEmailSent(true);

    // const response = await postForgotPassword(inputs);
    //
    // if (typeof response === "string") {
    //   toast.error(response, {
    //     duration: 5000,
    //   });
    // } else {
    //   if (!response) {
    //     toast.error("An error occurred during Sending Email", {
    //       duration: 5000,
    //     });
    //   } else {
    //     toast.success(
    //       "Reset link sent successfully, check your email address",
    //       {
    //         duration: 5000,
    //       },
    //     );
    //     setEmailSent(true);
    //   }
    //   setInputs({
    //     email: "",
    //   });
    // }

    setLoading(false);
  };

  return (
    <main className="w-full h-full flex justify-center px-2 items-center bg-center bg-cover bg-[url('/auth_page_bg_light.png')] dark:bg-[url('/auth_page_bg_dark.png')]">
      {!emailSent ? (
        <GradientDiv className="p-1 rounded-xl">
          <div className="bg-background dark:bg-background-dark rounded-xl p-5 flex flex-col items-center gap-5">
            <div className="w-full">
              <Link
                href="/auth"
                className={`${loading && "pointer-events-none opacity-60"} text-sm w-fit flex items-center gap-2 hover:bg-white dark:hover:bg-black hover:bg-opacity-40 dark:hover:bg-opacity-20 p-2 rounded-xl`}
                aria-disabled={loading}
              >
                <IoArrowBackCircleOutline size={15} />
                Back to Sign in
              </Link>
            </div>
            <h1 className="text-center text-xl md:text-2xl lg:text-3xl font-bold">
              Provide your email address
            </h1>
            <form
              onSubmit={handleSubmit}
              className="p-5 flex flex-col items-center gap-10"
            >
              <ForgotPasswordInputs inputs={inputs} setInputs={setInputs} />
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
                {loading ? "Sending" : "Send"}
              </motion.button>
            </form>
          </div>
        </GradientDiv>
      ) : (
        <EmailSent setEmailSent={setEmailSent} />
      )}
    </main>
  );
};

export default ForgotPassword;
