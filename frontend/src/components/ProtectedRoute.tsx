"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks";
import { getUser, checkValidToken } from "@/utils";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthorized, setUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      // If token is not present or user is not authorized,
      // redirect to home except for the /auth route
      if (!token || !isAuthorized) {
        if (pathname !== "/auth") {
          router.push("/home");
        }
        return;
      }

      // Check if the token is still valid
      const isValidToken = await checkValidToken(token);

      if (!isValidToken) {
        // If token is invalid, remove it and redirect to home
        localStorage.removeItem("token");
        router.push("/home");
        return;
      }

      // Fetch user information
      const user = await getUser(token);
      setUser(user);

      // Redirect to appropriate route based on user's authorization
      if (user && !pathname.startsWith("/boards")) {
        router.push("/boards");
      }
    };

    fetchUser();
  }, [isAuthorized, router, setUser, pathname]);

  return <>{children}</>;
}
