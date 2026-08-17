"use client";

import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { updateUser } from "@/lib/api/api";

export default function ProfilePage() {
  const { user, setUser } = useAuthStore();

  const [username, setUsername] = useState(user?.username ?? "");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Profile</h1>
        <p>You are not logged in.</p>
      </main>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const updatedUser = await updateUser({
        username,
      });

      setUser(updatedUser);

      alert("Profile updated");
    } catch {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>Profile</h1>

      <p>Email: {user.email}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
        </div>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br />
        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </main>
  );
}