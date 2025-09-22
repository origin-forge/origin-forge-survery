"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Only allow login for user 'admin' and password from env
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    if (email === "admin" && password === adminPassword) {
      setIsAdmin(true);
      setLoading(false);
    } else {
      setError("Invalid admin credentials.");
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>Admin Login</h1>
        <form onSubmit={handleLogin} style={{ maxWidth: 300 }}>
          <div style={{ marginBottom: "1rem" }}>
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" disabled={loading}>Login</button>
        </form>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Admin Panel</h1>
      <nav style={{ marginBottom: "2rem" }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link href="/admin/surveys">Survey Results</Link></li>
          <li><Link href="/admin/questions">Manage Questions</Link></li>
        </ul>
      </nav>
      <section>
        <p>Select an option from the navigation above.</p>
      </section>
    </main>
  );
}
