"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, Upload, LogOut, Trash, MoreVertical, Sun, Moon } from "lucide-react";
import onAction from "@/utils/admin/onAction";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion"

export default function ActionsDropdown() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const dropdownRef = useRef(null);

  const { theme, setTheme } = useTheme();
  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    router.push("/admin/login");
  };

  const handleAction = (action) => {
    setOpen(false);
    if (action === "logout") logout();
    else onAction(action);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded hover:bg-background"
      >
        <MoreVertical size={20} />
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 w-44 bg-background border border-border rounded shadow-md z-50">
          <li
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 hover:bg-surface cursor-pointer"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "light" ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="w-5 h-5 text-foreground" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="w-5 h-5 text-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
            {theme === "dark" ? "Light" : "Dark"}
          </li>
          <li
            onClick={() => handleAction("save")}
            className="flex items-center gap-2 px-4 py-2 hover:bg-surface cursor-pointer"
          >
            <Save size={16} /> Save
          </li>
          <li
            onClick={() => handleAction("publish")}
            className="flex items-center gap-2 px-4 py-2 hover:bg-surface cursor-pointer"
          >
            <Upload size={16} /> Publish
          </li>
          <li
            onClick={() => handleAction("logout")}
            className="flex items-center gap-2 px-4 py-2 hover:bg-surface cursor-pointer"
          >
            <LogOut size={16} /> Logout
          </li>
          <li
            onClick={() => handleAction("delete")}
            className="flex items-center gap-2 px-4 py-2 hover:bg-red-100 hover:text-white dark:hover:bg-red-700 text-red-600 cursor-pointer"
          >
            <Trash size={16} /> Delete
          </li>
        </ul>
      )}
    </div>
  );
}
