"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Card from "@/components/ui/Card";
import SkeletonBox from "@/components/ui/skeletons/SkeletonBox";

// 🔹 Generate a stable color from category name
function getColorFromName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return {
    primary: `hsl(${hue}, 70%, 50%)`,
    secondary: `hsl(${hue}, 70%, 85%)`,
  };
}

export default function CategoriesSection() {
  const [categories, setCategories] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        const top = data.sort((a, b) => b.count - a.count).slice(0, 6);
        setCategories(top);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="py-16 mt-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-r from-primary/5 to-accent/5 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-r from-success/5 to-warning/5 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ color: "var(--foreground)" }}
        >
          Discover Content by Category
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.3,
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {!categories
            ? Array.from({ length: 6 }).map((_, idx) => (
              <SkeletonCategoryCard key={idx} index={idx} />
            ))
            : categories.map((cat, idx) => {
              const colors = getColorFromName(cat.name);

              return (
                <CategoryCard
                  key={cat.name}
                  category={cat}
                  colors={colors}
                  index={idx}
                  isHovered={hoveredIndex === idx}
                  onHoverStart={() => setHoveredIndex(idx)}
                  onHoverEnd={() => setHoveredIndex(null)}
                />
              );
            })}
        </motion.div>
      </div>
    </section>
  );
}
function CategoryCard({
  category,
  colors,
  index,
  isHovered,
  onHoverStart,
  onHoverEnd,
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-6, 6]);

  // Parallax background shift (stronger movement)
  const bgX = useTransform(mouseX, [-0.5, 0.5], ["-20%", "20%"]);
  const bgY = useTransform(mouseY, [-0.5, 0.5], ["-20%", "20%"]);


  const isTouch =
    typeof window !== "undefined" && "ontouchstart" in window;

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXValue = (event.clientX - rect.left) / width - 0.5;
    const mouseYValue = (event.clientY - rect.top) / height - 0.5;

    mouseX.set(mouseXValue);
    mouseY.set(mouseYValue);
  }

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      <motion.div
        style={{
          rotateX: !isTouch && isHovered ? rotateX : 0,
          rotateY: !isTouch && isHovered ? rotateY : 0,
        }}
        whileHover={{
          y: -6,
          transition: { duration: 0.2 },
        }}
        onMouseMove={isHovered && !isTouch ? handleMouseMove : undefined}
      >
        <Link
          href={`/blogs?category=${category.name}`}
          aria-label={`View ${category.name} blogs`}
        >
          <Card className="h-full overflow-hidden relative group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            {/* 🔹 3D Parallax Background */}
            <motion.div
              className="absolute inset-0 opacity-60"
              style={{
                background: `radial-gradient(circle at center, ${colors.secondary} 0%, transparent 40%)`,
                x: bgX,
                y: bgY,
                scale: 0.8, // make it smaller
              }}
            />


            {/* Foreground content */}
            <div className="relative z-10 p-6 h-full flex flex-col justify-between">
              <div>
                {/* Icon placeholder (First letter) */}
                <motion.div
                  className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center"
                  style={{ backgroundColor: colors.primary }}
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-white font-bold text-lg">
                    {category.name.charAt(0)}
                  </span>
                </motion.div>

                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: "var(--foreground)" }}
                >
                  {category.name}
                </h3>
              </div>

              <div className="flex items-center justify-between mt-4">
                <motion.span
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: colors.primary,
                    color: "white",
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {category.count} {category.count === 1 ? "Blog" : "Blogs"}
                </motion.span>

                <motion.div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colors.secondary }}
                  whileHover={{
                    x: 3,
                    transition: { type: "spring", stiffness: 400, damping: 10 },
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: colors.primary }}
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </div>
            </div>
          </Card>
        </Link>
      </motion.div>
    </motion.div>
  );
}


// 🔹 Skeleton card shaped like real CategoryCard
function SkeletonCategoryCard({ index }) {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="h-40 p-6 flex flex-col justify-between rounded-2xl">
        <div>
          <SkeletonBox className="w-12 h-12 rounded-xl mb-4" />
          <SkeletonBox className="h-4 w-1/2 mb-2 rounded" />
        </div>
        <div className="flex items-center justify-between">
          <SkeletonBox className="h-6 w-16 rounded-full" />
          <SkeletonBox className="h-6 w-6 rounded-full" />
        </div>
      </Card>
    </motion.div>
  );
}
