"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const BlogNotFound = () => {
  return (
    <div className="flex flex-col lg:col-span-2 items-center justify-center py-16 text-center relative overflow-hidden">
      {/* Floating background dots */}
      <motion.div
        className="absolute w-32 h-32 bg-primary/10 rounded-full blur-3xl"
        animate={{ x: [0, 50, -50, 0], y: [0, -30, 30, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-24 h-24 bg-success/10 rounded-full blur-2xl top-10 right-10"
        animate={{ x: [0, -40, 40, 0], y: [0, 20, -20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      {/* Searching Glass */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-20 w-20 text-muted mb-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        initial={{ scale: 0.8, rotate: -10 }}
        animate={{ scale: [0.8, 1, 0.9, 1], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
        />
      </motion.svg>

      {/* Text */}
      <motion.h2
        className="text-2xl font-semibold mb-2"
        style={{ color: "var(--foreground)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        No Blogs Found
      </motion.h2>

      <motion.p
        className="text-muted mb-6 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        We couldn't find any blog posts here. Try exploring categories or check
        back later for new content.
      </motion.p>

      {/* Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          href="/blogs"
          className="px-5 py-2 rounded-lg font-medium transition-colors"
          style={{
            backgroundColor: "var(--primary)",
            color: "white",
          }}
        >
          Browse All Blogs
        </Link>
      </motion.div>
    </div>
  );
};

export default BlogNotFound;
