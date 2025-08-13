"use client";

import React, { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    // TODO: Add your login API call here
    console.log({ email, password });
    setError("");
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-surface rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          Admin Login
        </h2>

        {error && (
          <div className="mb-4 text-red-600 border border-red-400 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1 text-foreground"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1 text-foreground"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg bg-primary text-white font-semibold hover:bg-primary-hover transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
