"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const { isAuthenticated, user, clearUser } = useAuthStore();

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      clearUser();
    } catch (error) {
      console.error(error);
    }
  }

  if (isAuthenticated && user) {
    return (
      <>
        <li className={css.authItem}>
          <Link href="/profile" className={css.authLink}>
            Profile
          </Link>
        </li>

        <li className={css.authItem}>
          <span className={css.userEmail}>
            {user.email}
          </span>
        </li>

        <li className={css.authItem}>
          <button
            onClick={handleLogout}
            className={css.logoutButton}
          >
            Logout
          </button>
        </li>
      </>
    );
  }

  return (
    <>
      <li className={css.authItem}>
        <Link href="/sign-in" className={css.authLink}>
          Login
        </Link>
      </li>

      <li className={css.authItem}>
        <Link href="/sign-up" className={css.authLink}>
          Sign up
        </Link>
      </li>
    </>
  );
}