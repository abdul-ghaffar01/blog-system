"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Brain, Cloud, BookOpen, PenTool, Rocket } from "lucide-react";
import Card from "@/components/ui/Card"; // Your simple box with padding & shadow

const categories = [
  {
    name: "Programming",
    icon: Code,
    color: "var(--primary)",
    description: "Learn to code with guides, tips, and projects.",
  },
  {
    name: "AI & Machine Learning",
    icon: Brain,
    color: "var(--success)",
    description: "Explore the future of artificial intelligence.",
  },
  {
    name: "Cloud Computing",
    icon: Cloud,
    color: "var(--warning)",
    description: "Master the power of scalable cloud systems.",
  },
  {
    name: "Tech Guides",
    icon: BookOpen,
    color: "var(--danger)",
    description: "Step-by-step tutorials for all skill levels.",
  },
  {
    name: "Personal Development",
    icon: PenTool,
    color: "var(--primary)",
    description: "Level up your skills and mindset.",
  },
  {
    name: "Startups & Innovation",
    icon: Rocket,
    color: "var(--success)",
    description: "Build and grow ideas into successful ventures.",
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-12 mt-10">
      <h2
        className="text-2xl font-bold mb-8 text-center"
        style={{ color: "var(--foreground)" }}
      >
        Explore Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div
                    className="p-3 rounded-full"
                    style={{
                      backgroundColor: `${cat.color}20`, // transparent version
                      color: cat.color,
                    }}
                  >
                    <Icon size={28} />
                  </div>
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {cat.name}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--muted)" }}
                  >
                    {cat.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
