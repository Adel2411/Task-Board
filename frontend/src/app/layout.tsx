import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { DarkModeSwitch } from "@/components";
import { poppins } from "@/fonts";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/hooks";

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
    <html lang="en" suppressContentEditableWarning suppressHydrationWarning>
      <body
        className={`${poppins.className} bg-background dark:bg-background-dark text-text dark:text-text-dark transition-colors duration-500 ease-in-out h-screen w-screen overflow-auto`}
      >
        <Providers>
          <AuthProvider>
            <Toaster position="bottom-left" />

            {children}
          </AuthProvider>
          <DarkModeSwitch />
        </Providers>
      </body>
    </html>
  );
}
