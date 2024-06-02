import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { DarkModeSwitch } from "@/components";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Board App",
  description: "This is a task board app built with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressContentEditableWarning>
      <body
        className={`${poppins.className} bg-background dark:bg-background-dark text-text dark:text-text-dark transition-colors duration-300 ease-in-out`}
      >
        <Providers>
          {children}

          <DarkModeSwitch />
        </Providers>
      </body>
    </html>
  );
}
