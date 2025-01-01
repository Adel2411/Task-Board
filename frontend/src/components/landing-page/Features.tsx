"use client";

import { motion } from "framer-motion";
import { ClipboardList, Lock, Share2 } from "lucide-react";

const features = [
  {
    icon: ClipboardList,
    title: "Custom Boards",
    description: "Create and manage personalized task boards",
  },
  {
    icon: Lock,
    title: "Privacy Control",
    description: "Switch between public and private boards",
  },
  {
    icon: Share2,
    title: "Effortless Sharing",
    description: "Share boards with a link",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-foreground/80">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
