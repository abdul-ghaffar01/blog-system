"use client";

import Button from "@/components/ui/Button";
import useAdminStore from "@/stores/useAdminStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoadingForm, setIsLoadingForm] = useState("");
  const router = useRouter()
  const { loggedIn, setLoggedIn } = useAdminStore();

  useEffect(() => {
    if (loggedIn) { router.push("/admin") }
    // if token is available routing to admin regardless of damaged it will be checked on admin page 
    if(localStorage.getItem("accessToken")) router.push("/admin")
  }, [loggedIn, router])

  useEffect(() => {
    setTimeout(() => {
      setError("")
    }, 3000);
  }, [error])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingForm(true)
    // validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      const resp = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const res = await resp.json();

      if (!resp.ok) {
        setError(res.error || "Invalid login");
        return;
      }

      setLoggedIn(true)
      localStorage.setItem("accessToken", res.accessToken)
      router.push("/admin")
    } catch (err) {
      console.error("Login request failed", err);
      setError("Something went wrong");
    } finally {
      setIsLoadingForm(false)
    }
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-surface rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-foreground text-center">
          Admin Login
        </h2>


        <div className="mb-4 text-red-600 h-[20px] text-center mt-2 rounded">
          {error && error}
        </div>


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

          <Button
            loading={isLoadingForm}
            type="submit"
            className="w-full"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
