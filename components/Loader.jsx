"use client";

import { motion } from "framer-motion";

export default function Loader({ size = 20 }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 1,
        ease: "linear",
      }}
      style={{
        width: size,
        height: size,
      }}
      className="rounded-full border-4 border-border border-t-surface"
    />
  );
}
