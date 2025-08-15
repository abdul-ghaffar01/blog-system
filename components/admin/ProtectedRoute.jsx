"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAdminStore from "@/stores/useAdminStore";
import Loader from "../Loader";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { setLoggedIn } = useAdminStore();
  const [verifying, setVerifying] = useState(true); // <-- loading state

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem("accessToken");

      if (!storedToken) {
        router.push("/admin/login");
        return;
      }

      try {
        const res = await fetch("/api/verify-jwt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        });

        const data = await res.json();

        localStorage.setItem("accessToken", data.accessToken);
        setLoggedIn(true);
      } catch (error) {
        console.error("JWT verification failed:", error);
        localStorage.removeItem("accessToken");
        setLoggedIn(false);
        router.push("/admin/login");
      } finally {
        setVerifying(false); // <-- finished verifying
      }
    };

    checkAuth();
  }, [setLoggedIn, router]);

  if (verifying) {
    return <div className="flex flex-col justify-center items-center h-screen gap-3">
      <Loader />
      <p className="text-muted ">
        Verifying credentials...
      </p>
    </div>;
  }

  return children;
};

export default ProtectedRoute;
