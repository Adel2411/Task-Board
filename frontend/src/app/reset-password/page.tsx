"use client";

import { motion } from "framer-motion";
import { ResetPasswordInputs, GradientDiv, Toast } from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { postResetPassword } from "@/utils";
import Link from "next/link";

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [inputs, setInputs] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      setToken(token);
      // LINES BELOW ARE FOR DELETE TOKEN PARAM FROM URL
      // const params = new URLSearchParams(searchParams);
      // params.delete("token");
      // const newUrl = `/reset-password?${params.toString()}`;
      // router.replace(newUrl);
    } else {
      router.push("/home");
    }
  }, [searchParams, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const response = await postResetPassword(token, inputs);

    if (typeof response === "string") {
      toast.custom((t) => <Toast t={t} message={response} type="error" />);
    } else {
      if (!response) {
        toast.custom((t) => (
          <Toast
            t={t}
            message="An error occurred during password reset."
            type="error"
          />
        ));
      } else {
        toast.custom((t) => (
          <Toast t={t} message="Password reset successfully" type="success" />
        ));
        router.push("/auth");
      }
      setInputs({
        password: "",
        confirmPassword: "",
      });
    }
    setLoading(false);
  };

  return (
    <main className="w-full h-full flex justify-center px-2 items-center bg-center bg-cover bg-[url('/auth_page_bg_light.png')] dark:bg-[url('/auth_page_bg_dark.png')]">
      <GradientDiv className="p-1 rounded-xl">
        <div className="bg-background dark:bg-background-dark rounded-xl md:p-3 py-5 flex flex-col items-center gap-5">
          <div className="w-full">
            <Link
              href="/forgot-password"
              className={`${loading && "pointer-events-none opacity-60"} text-sm w-fit flex items-center gap-2 hover:bg-white dark:hover:bg-black hover:bg-opacity-40 dark:hover:bg-opacity-20 p-2 rounded-xl`}
              aria-disabled={loading}
            >
              <IoArrowBackCircleOutline size={15} />
              Provide another email
            </Link>
          </div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
            Submit your new password
          </h1>
          <form
            onSubmit={handleSubmit}
            className="p-5 flex flex-col items-center gap-10"
          >
            <ResetPasswordInputs inputs={inputs} setInputs={setInputs} />
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
              {loading ? "Submitting" : "Submit"}
            </motion.button>
          </form>
        </div>
      </GradientDiv>
    </main>
  );
};

export default ResetPassword;
