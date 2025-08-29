"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Tag, Clock, Filter } from "lucide-react";

const Page = () => {
  const [blogs, setBlogs] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);

  // filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Newest");

  // fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/blogs?page=${page}&limit=6`);
        const data = await res.json();
        if (page === 1) {
          setBlogs(data.blogs);
          setFeatured(data.blogs[0]);
        } else {
          setBlogs((prev) => [...prev, ...data.blogs]);
        }
        setHasMore(data.hasMore);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [page]);

  // categories
  const categories = ["All", ...new Set(blogs.map((b) => b.category))];

  // filtered
  let filtered = blogs.filter((item) => {
    const matchCategory = category === "All" || item.category === category;
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (sort === "Newest") {
    filtered = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sort === "Oldest") {
    filtered = [...filtered].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sort === "Popular") {
    filtered = [...filtered].sort((a, b) => (b.views || 0) - (a.views || 0));
  }

  return (
    <main
      className="max-w-7xl mx-auto px-6 py-12 space-y-12"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* Featured */}
      {featured && (
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl overflow-hidden shadow-md"
          style={{ background: "var(--surface)" }}
        >
          <img
            src={featured.image}
            alt={featured.title}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 p-8 text-white">
            <span className="text-sm uppercase font-semibold text-[var(--primary)]">
              {featured.category}
            </span>
            <h2 className="mt-2 text-4xl font-bold">{featured.title}</h2>
            <p className="mt-3 text-gray-200">{featured.excerpt}</p>
            <a
              href={`/blogs/${featured.slug}`}
              className="inline-block mt-5 px-4 py-2 bg-[var(--primary)] rounded-lg font-medium hover:bg-[var(--primary-hover)] transition"
            >
              Read More →
            </a>
          </div>
        </motion.section>
      )}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Sidebar Filters */}
        <aside
          className="w-full lg:w-64 flex-shrink-0 rounded-xl border bg-[var(--surface)] shadow-sm p-4 lg:p-5 h-fit 
             lg:sticky lg:top-5"
          style={{ borderColor: "var(--border)" }}
        >
          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3 text-[var(--foreground)]">Categories</h3>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap lg:flex-col gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition text-center sm:text-left
            ${category === c
                      ? "bg-[var(--primary)] text-white"
                      : "bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--primary-hover)] hover:text-white"
                    }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-[var(--foreground)]">Sort By</h3>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[var(--muted)] hidden sm:block" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border bg-[var(--background)] text-sm"
                style={{ borderColor: "var(--border)" }}
              >
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
                <option value="Popular">Most Popular</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Blog Grid */}
        <div className="flex-1">
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading && blogs.length === 0
              ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-60 rounded-xl animate-pulse"
                  style={{ background: "var(--surface)" }}
                ></div>
              ))
              : filtered
                .filter((b) => b._id !== featured?._id)
                .map((blog, i) => (
                  <motion.article
                    key={blog._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group rounded-2xl overflow-hidden shadow border flex flex-col"
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
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </div>
                      <h2 className="mt-2 text-lg font-bold group-hover:text-[var(--primary)] transition-colors">
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

          {/* See More */}
          {hasMore && !loading && (
            <div className="text-center mt-8">
              <button
                onClick={() => setPage((p) => p + 1)}
                className="px-6 py-2 rounded-lg font-medium bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition"
              >
                See More
              </button>
            </div>
          )}
        </div>
      </div>

    </main>
  );
};

export default Page;
