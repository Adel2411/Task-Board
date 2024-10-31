"use client";

import { Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ResetPasswordInputs, GradientDiv, Toast } from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { postResetPassword } from "@/utils";
import Link from "next/link";
import { buttonVariants } from "@/animations";
import Image from "next/image";

// Fallback component for Suspense
const LoadingFallback = () => (
  <div className="w-full h-full flex justify-center items-center">
    <span className="loading loading-spinner loading-lg"></span>
  </div>
);

const ResetPasswordContent = () => {
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
      // Optional: Remove token from URL
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

    try {
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
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.custom((t) => (
        <Toast t={t} message="An unexpected error occurred." type="error" />
      ));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full h-full flex justify-center px-2 items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/auth_page_bg_light.png"
          alt="Auth Background Light"
          fill
          className="object-cover dark:hidden"
          priority
        />
        <Image
          src="/auth_page_bg_dark.png"
          alt="Auth Background Dark"
          fill
          className="object-cover hidden dark:block"
          priority
        />
      </div>

      <GradientDiv className="p-1 rounded-xl z-10">
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
              variants={buttonVariants}
              whileHover={loading ? { scale: 1 } : "hover"}
              whileTap={loading ? { scale: 1 } : "tap"}
              disabled={loading}
              className={`w-full h-10 text-sm font-semibold bg-background-dark dark:bg-background text-background dark:text-background-dark rounded-l-full rounded-r-full ${loading && "flex justify-center items-center gap-5 bg-opacity-25 dark:bg-opacity-25 cursor-not-allowed"}`}
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

const ResetPassword = () => (
  <Suspense fallback={<LoadingFallback />}>
    <ResetPasswordContent />
  </Suspense>
);

export default ResetPassword;
