"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export default function DarkModeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <>
      {!mounted ? (
        <div className="text-xs fixed top-4 right-4 p-2 text-background-dark dark:text-background">
          Loading...
        </div>
      ) : theme === "dark" ? (
        <button
          className="fixed top-4 right-4 p-2 rounded-full bg-switch_bg-dark text-background"
          onClick={() => setTheme("light")}
        >
          <MdOutlineLightMode />
        </button>
      ) : (
        <button
          className="fixed top-4 right-4 p-2 rounded-full bg-switch_bg text-background-dark"
          onClick={() => setTheme("dark")}
        >
          <MdOutlineDarkMode />
        </button>
      )}
    </>
  );
}
