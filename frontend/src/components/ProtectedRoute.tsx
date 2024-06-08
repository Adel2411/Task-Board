"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthorized } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthorized) {
      if (pathname !== "/home" && pathname !== "/auth") {
        router.push("/home");
      }
    } else {
      if (!pathname.startsWith("/boards")) {
        router.push("/boards");
      }
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/home");
        return;
      }
    }
  }, [isAuthorized, router]);

  return <>{children}</>;
}
