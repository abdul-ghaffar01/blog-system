"use client";

import clsx from "clsx";

export default function Card({ children, className }) {
  return (
    <div
      className={clsx(
        "bg-surface rounded-xl shadow-md p-6 border border-border transition-all duration-200 hover:shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}
