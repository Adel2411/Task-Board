"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/auth");
  });

  return (
    <main className="flex justify-center items-center text-3xl font-bold h-screen w-screen bg-auth_bg dark:bg-auth_bg-dark">
      <div className="flex justify-center items-center w-full gap-2">
        <div>Redirecting</div>
        <span className="loading loading-dots loading-md"></span>
      </div>
    </main>
  );
}
