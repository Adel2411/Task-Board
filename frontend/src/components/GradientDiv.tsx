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
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default GradientDiv;
