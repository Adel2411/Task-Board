"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { checkValidToken, getUser } from "@/utils";
import { AuthContextType, User } from "@/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuthorization = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthorized(false);
        return;
      }

      const response = await checkValidToken(token);
      setIsAuthorized(response);
      if (response) {
        if (!pathname.startsWith("/boards/")) {
          router.push("/boards");
        }
        const user = await getUser(token);
        setUser(user);
      } else {
        localStorage.removeItem("token");
        setUser(null);
        if (!pathname.startsWith("/boards/")) {
          router.push("/home");
        }
      }
    };

    checkAuthorization();
  }, [router]);

  const values = { isAuthorized, setIsAuthorized, user, setUser };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
