"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import GradientDiv from "../GradientDiv";
import Link from "next/link";

export default function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-500, 500], [15, -15]);
  const rotateY = useTransform(x, [-500, 500], [-15, 15]);

  function handleMouse(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background dark:bg-background-dark"
      onMouseMove={handleMouse}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
        <motion.div
          className="md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl mb-4 md:text-6xl font-bold text-foreground">
            Your Tasks,{" "}
            <span className="text-primary dark:text-primary-dark">
              Your Way
            </span>
          </h1>
          <p className="text-xl mb-8 text-foreground/80">
            Organize your boards, manage tasks, and share progress effortlessly
          </p>
          <GradientDiv className="rounded-xl p-[3px] w-fit">
            <Link
              className="btn btn-ghost bg-white hover:bg-white/80 dark:bg-black dark:hover:bg-black/80 hover:text-primary dark:hover:text-primary-dark"
              href="/auth"
            >
              Get Started
            </Link>
          </GradientDiv>
        </motion.div>
        <motion.div
          className="md:w-1/2"
          style={{ perspective: 2000, rotateX, rotateY }}
        >
          <Image
            src="/mockup.png"
            alt="myTaskBoard mockup"
            width={600}
            height={400}
            className="mt-12 rounded-lg shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
