"use client";

import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <section id="get-started" className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-6 text-primary-foreground">
          Ready to Get Started?
        </h2>
        <p className="text-xl mb-8 text-primary-foreground/80">
          Join thousands of users who are already enjoying the benefits of
          myTaskBoard.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-background text-foreground px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-200"
        >
          Start Now
        </motion.button>
      </div>
    </section>
  );
}
