"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Tag, Clock, Filter } from "lucide-react";

const Page = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Newest");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const categories = ["All", ...new Set(blogs.map((item) => item.category))];

  let filtered = blogs.filter((item) => {
    const matchCategory = category === "All" || item.category === category;
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (sort === "Newest") {
    filtered = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sort === "Oldest") {
    filtered = [...filtered].sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sort === "Popular") {
    filtered = [...filtered].sort((a, b) => b.views - a.views);
  }

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <main
      className="max-w-7xl mx-auto px-6 py-12 space-y-12"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* Hero Featured Blog */}
      {loading ? (
        <div className="animate-pulse h-[400px] rounded-3xl bg-[var(--surface)]" />
      ) : (
        featured && (
          <motion.section
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-3xl overflow-hidden shadow-lg group"
            style={{ background: "var(--surface)" }}
          >
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 p-8 text-white max-w-2xl">
              <span className="text-sm uppercase tracking-wide text-[var(--primary)] font-semibold">
                {featured.category}
              </span>
              <h2 className="mt-2 text-4xl font-extrabold leading-snug">
                {featured.title}
              </h2>
              <p className="mt-3 text-base text-gray-200 line-clamp-2">
                {featured.excerpt}
              </p>
              <a
                href={`/blogs/${featured.slug}`}
                className="inline-block mt-5 px-4 py-2 bg-[var(--primary)] rounded-xl font-medium hover:bg-[var(--primary-hover)] transition"
              >
                Read More →
              </a>
            </div>
          </motion.section>
        )
      )}

      {/* Search + Filters */}
      {!loading && (
        <section className="flex flex-col lg:flex-row items-center justify-between gap-4 sticky top-0 z-10 py-4 bg-[var(--background)]/95 backdrop-blur-md rounded-xl border" style={{ borderColor: "var(--border)" }}>
          <div className="relative w-full lg:w-1/2">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-[var(--muted)]" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  category === c
                    ? "bg-[var(--primary)] text-white"
                    : "bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--primary-hover)] hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[var(--muted)]" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-1.5 rounded-lg border bg-[var(--surface)] text-sm"
              style={{ borderColor: "var(--border)" }}
            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="Popular">Most Popular</option>
            </select>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <motion.div
        layout
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse h-64 rounded-2xl bg-[var(--surface)]"
              />
            ))
          : rest.map((blog, i) => (
              <motion.article
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-2xl overflow-hidden shadow-sm border hover:shadow-lg transition-all cursor-pointer flex flex-col"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                {blog.image && (
                  <div className="overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                    <Tag className="w-3 h-3" /> {blog.category}
                    <Clock className="w-3 h-3 ml-3" />{" "}
                    {new Date(blog.date).toLocaleDateString()}
                  </div>
                  <h2 className="mt-2 text-lg font-bold leading-snug group-hover:text-[var(--primary)] transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-[var(--muted)] mt-3 line-clamp-3 flex-1">
                    {blog.excerpt}
                  </p>
                  <a
                    href={`/blogs/${blog.slug}`}
                    className="inline-block mt-4 text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)]"
                  >
                    Continue Reading →
                  </a>
                </div>
              </motion.article>
            ))}
      </motion.div>

      {!loading && filtered.length === 0 && (
        <p className="text-center text-[var(--muted)] mt-12">No blogs found.</p>
      )}
    </main>
  );
};

export default Page;
