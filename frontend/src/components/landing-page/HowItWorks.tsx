"use client";

import { motion } from "framer-motion";
import { PlusCircle, ListChecks, Share2 } from "lucide-react";

const steps = [
  {
    icon: PlusCircle,
    title: "Create a Board",
    description: "Start by creating a new board for your project or task list.",
  },
  {
    icon: ListChecks,
    title: "Add Tasks",
    description:
      "Break down your project into manageable tasks and add them to your board.",
  },
  {
    icon: Share2,
    title: "Collaborate",
    description:
      "Invite team members to collaborate on your board and assign tasks.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-foreground"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How It Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <motion.div
                className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <step.icon className="w-8 h-8 text-primary" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {step.title}
              </h3>
              <p className="text-foreground/80">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
