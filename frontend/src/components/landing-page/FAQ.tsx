"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What is myTaskBoard?",
    answer:
      "myTaskBoard is a powerful task management application that helps you organize your work, collaborate with team members, and boost productivity.",
  },
  {
    question: "How does the free trial work?",
    answer:
      "We offer a 14-day free trial for all new users. You can explore all features of the Pro plan during this period without any commitment.",
  },
  {
    question: "Can I share my boards with external collaborators?",
    answer:
      "Yes, you can easily share your boards with anyone, even if they don't have a myTaskBoard account. They'll receive a special link to view and interact with the shared board.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use industry-standard encryption and security measures to protect your data. Your privacy and data security are our top priorities.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-background dark:bg-background-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-foreground"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-primary/20 dark:border-primary-dark/20 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                className="flex justify-between items-center w-full p-4 text-left bg-background dark:bg-background-dark hover:bg-primary/5 dark:hover:bg-primary-dark/5 transition-colors duration-200"
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
              >
                <span className="text-lg font-semibold text-foreground">
                  {faq.question}
                </span>
                {activeIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-primary dark:text-primary-dark" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-primary dark:text-primary-dark" />
                )}
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="p-4 text-foreground/80">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
