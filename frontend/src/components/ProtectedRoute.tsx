"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/authContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthorized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("isAuthorized", isAuthorized);
    if (!isAuthorized) {
      router.push("/home");
    } else {
      router.push("/boards");
    }
  }, [isAuthorized, router]);

  return <>{children}</>;
}
