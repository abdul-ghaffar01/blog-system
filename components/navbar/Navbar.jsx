"use client";

import { useEffect, useState } from "react";
import { Menu, X, Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import Link from "next/link";
import useSearchStore from "@/stores/useSearchStore";

const Navbar = () => {
  const { setSearching } = useSearchStore();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key.toLowerCase() === "k") {
        event.preventDefault(); // prevent browser default Ctrl+K action
        handleSearch()
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [])

  const handleSearch = () => {
    console.log("handling search")
    setSearching(true);
  }

  return (
    <header className="w-full bg-surface border-b border-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold text-primary ">
          <Logo />
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <button
            onClick={handleSearch}
            className="flex items-center justify-center md:justify-between bg-background w-10 h-10 md:w-[300px] p-2 md:rounded-md rounded-full overflow-hidden"
          >
            {/* Text - only on md and up */}
            <p className="text-muted m-0 hidden md:block">Search anything...</p>

            {/* Shortcut Keys - only on md and up */}
            <div className="hidden md:flex items-center gap-1 bg-surface px-2 py-1 rounded">
              <kbd className="text-sm text-muted">⌘</kbd>
              <kbd className="text-sm text-muted">K</kbd>
            </div>

            {/* Mobile Search Icon - only on mobile */}
            <div className="md:hidden flex items-center">
              <Search size={20} />
            </div>
          </button>


          {/* Theme Toggle */}
          <ThemeToggle />


        </div>
      </div>


    </header>
  );
};

export default Navbar;
