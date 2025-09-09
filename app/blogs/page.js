"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import BlogCard from "@/components/ui/BlogCard";
import BlogsSkeleton from "@/components/ui/skeletons/BlogsSkeleton";
import Button from "@/components/ui/Button";
import Loader from "@/components/Loader";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [blogs, setBlogs] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [fetchingCategories, setFetchingCategories] = useState(false);
  const [categories, setCategories] = useState([{ name: "All", count: 0 }]);

  // filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Newest");

  // ✅ Fetch latest blog once for Featured
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`/api/blogs?limit=1&sort=recent`);
        const data = await res.json();
        setFeatured(data.blogs[0] || null);
      } catch (err) {
        console.error("Failed to fetch featured blog", err);
      }
    };
    fetchFeatured();
  }, []);

  // read category from URL
  useEffect(() => {
    const urlCategory = searchParams.get("category");
    if (urlCategory) setCategory(urlCategory);
  }, [searchParams]);

  // fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      try {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", 6);
        if (category && category !== "All") params.append("category", category);
        if (search) params.append("search", search);
        if (sort) params.append("sort", sort.toLowerCase());

        const res = await fetch(`/api/blogs?${params.toString()}`);
        const data = await res.json();

        if (page === 1) {
          setBlogs(data.blogs);
        } else {
          setBlogs((prev) => [...prev, ...data.blogs]);
        }

        setHasMore(data.hasMore);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };
    fetchBlogs();
  }, [page, category, search, sort]);

  // fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      setFetchingCategories(true);
      try {
        const res = await fetch(`/api/categories`);
        const data = await res.json();
        setCategories([{ name: "All", count: 0 }, ...data]);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setFetchingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // filtered blogs
  let filtered = blogs.filter((item) => {
    const matchCategory = category === "All" || item.category === category;
    return matchCategory;
  });

  if (sort === "Newest") {
    filtered = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sort === "Oldest") {
    filtered = [...filtered].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sort === "Popular") {
    filtered = [...filtered].sort((a, b) => (b.views || 0) - (a.views || 0));
  }

  // handle category click
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);

    const params = new URLSearchParams();
    if (newCategory && newCategory !== "All") {
      params.set("category", newCategory);
    }
    router.replace(`?${params.toString()}`, { scroll: false });

  };

  if (loading && blogs.length === 0) {
    return <BlogsSkeleton />;
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
            src={featured.coverImage}
            alt={featured.metaTitle || featured.title}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 p-8 text-white">
            <span className="text-sm uppercase font-semibold text-[var(--primary)]">
              {featured.category}
            </span>
            <h2 className="mt-2 text-4xl font-bold">{featured.title}</h2>
            <p className="mt-3 text-gray-200">{featured.excerpt}</p>

            <div className="flex items-center gap-6 mt-3 text-sm text-gray-300">
              <span>👁 {featured.views} views</span>
              <span>❤️ {featured.likes} likes</span>
            </div>

            <Link
              href={`/blogs/${featured.slug}`}
              className="inline-block mt-5 px-4 py-2 bg-[var(--primary)] rounded-lg font-medium hover:bg-[var(--primary-hover)] transition"
            >
              Read More →
            </Link>
          </div>
        </motion.section>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside
          className="w-full lg:w-64 flex-shrink-0 rounded-xl border bg-[var(--surface)] shadow-sm p-4 lg:p-5 h-fit 
             lg:sticky lg:top-17"
          style={{ borderColor: "var(--border)" }}
        >
          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3 text-[var(--foreground)]">Categories</h3>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap lg:flex-col gap-2">
              {categories.map((c, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryChange(c.name)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition text-center sm:text-left
            ${category === c.name
                      ? "bg-[var(--primary)] text-white"
                      : "bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--primary-hover)] hover:text-white"
                    }`}
                >
                  {c.name}
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
            {filtered
              .map((blog, i) => (
                <BlogCard key={blog._id} blog={blog} idx={i} />
              ))}
          </motion.div>

          {/* See More */}
          {hasMore && (
            <div className="text-center mt-8">
              <Button
                loading={loadingMore}
                onClick={() => setPage((p) => p + 1)}
                className="px-6 py-2 rounded-lg font-medium bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition"
              >
                {loadingMore ? <Loader size="sm" /> : "See More"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;
