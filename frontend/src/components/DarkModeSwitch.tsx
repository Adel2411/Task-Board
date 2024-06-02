"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export default function DarkModeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <div className="text-xs fixed top-4 right-4 p-2 text-background-dark dark:text-background">
        Loading...
      </div>
    );

  if (theme === "dark") {
    return (
      <button
        className="fixed top-4 right-4 p-2 rounded-full bg-switch_bg-dark text-background"
        onClick={() => setTheme("light")}
      >
        <MdOutlineLightMode />
      </button>
    );
  }

  if (theme === "light") {
    return (
      <button
        className="fixed top-4 right-4 p-2 rounded-full bg-switch_bg text-background-dark"
        onClick={() => setTheme("dark")}
      >
        <MdOutlineDarkMode />
      </button>
    );
  }
}
