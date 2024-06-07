"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { gradientDivProps } from "@/types";
import { gradientBackground, gradientBackgroundDark } from "@/animations";

const GradientDiv = ({ children, className }: gradientDivProps) => {
  const { theme } = useTheme();

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={theme === "dark" ? gradientBackgroundDark : gradientBackground}
      // className={`flex justify-center items-center w-full md:w-2/3 lg:w-1/2 2xl:w-1/3 mx-5 h-5/6 rounded-3xl p-1`}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default GradientDiv;
