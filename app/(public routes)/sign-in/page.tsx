"use client";

import { useState } from "react";
import { loginUser, getCurrentUser } from "@/lib/api/api";
import { useAuthStore } from "@/lib/store/authStore";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setUser = useAuthStore((state) => state.setUser);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await loginUser({
        email,
        password,
      });

      const user = await getCurrentUser();

      setUser(user);

      alert("Login successful");
    } catch {
      alert("Login failed");
    }
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <br />

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">Login</button>
      </form>
    </main>
  );
}