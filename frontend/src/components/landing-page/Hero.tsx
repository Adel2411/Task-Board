"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

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
          className="md:w-1/2 text-center md:text-left mb-12 md:mb-0"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Your Tasks, <span className="text-primary">Your Way</span>
          </h1>
          <p className="text-xl mb-8 text-foreground/80">
            Organize your boards, manage tasks, and share progress effortlessly
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            Get Started
          </motion.button>
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
            className="rounded-lg shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
