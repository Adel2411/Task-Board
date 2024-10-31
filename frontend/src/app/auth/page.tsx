"use client";

import { useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { GradientDiv, Signin, Signup } from "@/components";
import Link from "next/link";
import Image from "next/image";

export default function AuthPage() {
  const [showSignin, setShowSignin] = useState(true);
  const [loading, setLoading] = useState(false);

  return (
    <main className="w-screen h-screen flex justify-center items-center overflow-y-scroll">
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

      <GradientDiv className="z-10 flex justify-center items-center m-5 w-full md:w-2/3 lg:w-1/2 2xl:w-1/3 h-5/6 rounded-3xl p-1 shadow-xl">
        <div className="overflow-y-scroll bg-background text-black dark:bg-background-dark dark:text-white w-full h-full rounded-3xl flex flex-col items-center gap-10 p-5 lg:pt-10 xl:pt-16">
          <div className="w-full h-fit">
            <Link
              href="/home"
              className={`${loading && "pointer-events-none opacity-60"} text-sm w-fit flex items-center gap-2 hover:bg-white dark:hover:bg-black hover:bg-opacity-40 dark:hover:bg-opacity-20 p-2 rounded-xl`}
              aria-disabled={loading}
            >
              <IoArrowBackCircleOutline size={15} />
              Back to home
            </Link>
          </div>
          <div className=" w-full h-fit flex items-center">
            <button
              className={`py-3 w-1/2 h-full rounded-l-xl text-white dark:text-black ${!showSignin ? "disabled:bg-opacity-50 dark:disabled:bg-opacity-50" : "bg-opacity-25 dark:bg-opacity-25"} bg-black dark:bg-white`}
              onClick={() => setShowSignin(false)}
              disabled={loading}
            >
              Sign up
            </button>
            <button
              className={`py-3 w-1/2 h-full rounded-r-xl text-white dark:text-black ${showSignin ? "disabled:bg-opacity-50 dark:disabled:bg-opacity-50" : "bg-opacity-25 dark:bg-opacity-25"} bg-black dark:bg-white`}
              onClick={() => setShowSignin(true)}
              disabled={loading}
            >
              Sign in
            </button>
          </div>
          {showSignin ? (
            <Signin loading={loading} setLoading={setLoading} />
          ) : (
            <Signup loading={loading} setLoading={setLoading} />
          )}
        </div>
      </GradientDiv>
    </main>
  );
}
