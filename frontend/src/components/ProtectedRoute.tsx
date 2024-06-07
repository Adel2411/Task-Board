"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/authContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthorized } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log("isAuthorized", isAuthorized);
    if (!isAuthorized) {
      if (pathname !== "/home" && pathname !== "/auth") {
        router.push("/home");
      } else if (pathname === "/auth") {
        router.push("/auth");
      } else if (pathname === "/home") {
        router.push("/home");
      }
    } else {
      router.push("/boards");
    }
  }, [isAuthorized, router]);

  return <>{children}</>;
}
