"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

const privateRoutes = ["/profile", "/notes"];

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated, clearUser } = useAuthStore();

  useEffect(() => {
    const isPrivateRoute = privateRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isPrivateRoute && !isAuthenticated) {
      clearUser();
      router.replace("/sign-in");
    }
  }, [pathname, isAuthenticated, router, clearUser]);

  return <>{children}</>;
}