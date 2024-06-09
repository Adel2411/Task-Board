"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks";
import { Custom404 } from "@/components";

const NotFound = () => {
  const router = useRouter();
  const { isAuthorized } = useAuth();

  useEffect(() => {
    if (!isAuthorized) {
      router.push("/home");
    } else {
      router.push("/boards");
    }
  }, [isAuthorized, router]);

  return <Custom404 text="Page not found, redirecting" />;
};

export default NotFound;
