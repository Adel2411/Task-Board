"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const showcaseItems = [
  {
    title: "Create and Manage Boards",
    description:
      "Effortlessly create boards with customizable titles and descriptions. Manage your boards by toggling privacy settings or sharing them via public links.",
    image: "/create-manage-boards.png",
  },
  {
    title: "Track Task Progress",
    description:
      "Keep your tasks organized with status colors: green for completed, red for not doing, orange for in-progress, and neutral for unclassified tasks.",
    image: "/track-task-progress.png",
  },
  {
    title: "Interactive Task Management",
    description:
      "Organize tasks with ease. Add titles, descriptions, emojis, and status colors to stay on top of your work. Update tasks quickly with our intuitive interface.",
    image: "/interactive-tasks.png",
  },
  {
    title: "Share Boards with Ease",
    description:
      "Generate a shareable link for public boards, allowing anyone to view your content. Perfect for showcasing your work to others without requiring login.",
    image: "/share-board.png",
  },
];

export default function Showcase() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="showcase"
      ref={targetRef}
      className="py-20 bg-background dark:bg-background-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          Discover myTaskBoard Features
        </h2>
        <div className="space-y-32">
          {showcaseItems.map((item, index) => {
            const translateY = useTransform(
              scrollYProgress,
              [
                index / showcaseItems.length,
                (index + 1) / showcaseItems.length,
              ],
              [100, 0],
            );
            const opacity = useTransform(
              scrollYProgress,
              [
                index / showcaseItems.length,
                (index + 0.5) / showcaseItems.length,
              ],
              [0, 1],
            );

            return (
              <motion.div
                key={index}
                style={{ translateY, opacity }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-semibold mb-4 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-foreground/80">{item.description}</p>
                </div>
                <div className="md:w-1/2">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
