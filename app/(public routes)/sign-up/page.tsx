"use client";

import { useState } from "react";
import { registerUser } from "@/lib/api/api";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await registerUser({
        email,
        password,
      });

      alert("Registration successful");
    } catch {
      alert("Registration failed");
    }
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>Sign Up</h1>

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

        <button type="submit">Register</button>
      </form>
    </main>
  );
}