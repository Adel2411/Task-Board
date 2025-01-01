"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <motion.li whileTap={{ scale: 0.95 }}>
    <Link
      href={href}
      className="text-foreground hover:text-primary dark:hover:text-primary-dark transition-colors duration-200"
    >
      {children}
    </Link>
  </motion.li>
);

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed w-full bg-background/80 dark:bg-background-dark/80 backdrop-blur-sm z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-black text-primary dark:text-primary-dark flex items-center justify-center gap-2"
            >
              <Image src="/Logo.svg" alt="Logo" width={24} height={24} />
              myTaskBoard
            </Link>
          </div>
          <ul className="hidden md:flex space-x-8 pr-20">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#showcase">Showcase</NavLink>
            <NavLink href="#faq">FAQ</NavLink>
            <NavLink href="#get-started">Get Started</NavLink>
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}
