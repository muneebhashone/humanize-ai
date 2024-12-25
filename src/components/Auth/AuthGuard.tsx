"use client";

import { useIsAuthenticated } from "@/hooks/queries/use-auth-query";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
}

const publicPaths = ["/login", "/register", "/forgot-password"];

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated, isLoading } = useIsAuthenticated();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated && !publicPaths.includes(pathname)) {
        router.push("/login");
      } else if (isAuthenticated && publicPaths.includes(pathname)) {
        router.push("/");
      }
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
          <p className="text-white/60">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && !publicPaths.includes(pathname)) {
    return null;
  }

  if (isAuthenticated && publicPaths.includes(pathname)) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard; 