"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Boards = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token && !localStorage.getItem("token")) {
      router.push("/home");
    } else if (token) {
      localStorage.setItem("token", token);
      const params = new URLSearchParams(searchParams);
      params.delete("token");
      const newUrl = `/boards?${params.toString()}`;
      router.replace(newUrl);
    }
  }, [searchParams, router]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    location.reload();
  };

  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">Boards</h1>
      <button onClick={handleLogOut}>Log out</button>
    </main>
  );
};

export default Boards;
