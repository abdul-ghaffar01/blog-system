"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, X, Calendar, Tag } from "lucide-react";
import useSearchStore from "@/stores/useSearchStore";

// Dummy blog data
const blogs = [
  {
    title: "Mastering Git & GitHub",
    excerpt: "A step-by-step guide to version control and collaboration.",
    date: "2025-09-01",
    tag: "Development",
    cover: "/covers/git.jpg",
  },
  {
    title: "Intro to Cloud with Go",
    excerpt: "Learn how to build scalable cloud services using Golang.",
    date: "2025-08-20",
    tag: "Cloud",
    cover: "/covers/go.jpg",
  },
  {
    title: "Scaling with Microservices",
    excerpt: "Architecture tips for building resilient distributed systems.",
    date: "2025-07-15",
    tag: "Architecture",
    cover: "/covers/microservices.jpg",
  },
];

export default function Search() {
  const { searching, setSearching, query, setQuery } = useSearchStore();

  const filtered = blogs.filter((b) =>
    b.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {searching && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSearching(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 
                       rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-2xl p-6"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-[var(--foreground)]">Search Blogs</h2>
              <button
                onClick={() => setSearching(false)}
                className="p-2 rounded-full hover:bg-[var(--muted-light)] transition-colors text-[var(--muted)]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search input */}
            <div className="relative mb-6">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={18} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search blog posts..."
                className="w-full rounded-lg bg-[var(--background)] border border-[var(--border)] 
                           px-10 py-3 text-[var(--foreground)] placeholder-[var(--muted)] outline-none 
                           focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-light)] transition-all"
              />
            </div>

            {/* Results */}
            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
              {query === "" ? (
                <>
                  <p className="text-sm text-[var(--muted)] mb-2">Featured blogs</p>
                  {blogs.slice(0, 2).map((blog, i) => (
                    <BlogResult key={i} {...blog} />
                  ))}
                </>
              ) : filtered.length > 0 ? (
                filtered.map((blog, i) => <BlogResult key={i} {...blog} />)
              ) : (
                <p className="text-[var(--muted)] text-sm">No blogs found.</p>
              )}
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end text-xs text-[var(--muted)]">
              Press <kbd className="px-1 py-0.5 bg-[var(--muted-light)] rounded">Esc</kbd> to close
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function BlogResult({ title, excerpt, date, tag, cover }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="flex gap-4 p-4 rounded-lg bg-[var(--background)] border border-[var(--border)] 
                 cursor-pointer hover:bg-[var(--muted-light)] transition"
    >
      {/* Thumbnail */}
      <img
        src={cover}
        alt={title}
        className="w-16 h-16 rounded-md object-cover flex-shrink-0"
      />

      {/* Content */}
      <div className="flex flex-col">
        <h3 className="text-[var(--foreground)] font-medium">{title}</h3>
        <p className="text-sm text-[var(--muted)] line-clamp-2">{excerpt}</p>
        <div className="flex items-center gap-4 mt-2 text-xs text-[var(--muted)]">
          <span className="flex items-center gap-1"><Calendar size={12} /> {date}</span>
          <span className="flex items-center gap-1"><Tag size={12} /> {tag}</span>
        </div>
      </div>
    </motion.div>
  );
}
