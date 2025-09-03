"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";
import SkeletonBox from "@/components/ui/skeletons/SkeletonBox";
import constructBlog from "@/utils/constructBlog";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/components/Loader";


export default function BlogPage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  // pagination states
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  // ✅ fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // fetch current blog
        const blogRes = await fetch(`/api/blogs/${slug}`);
        const blogData = await blogRes.json();
        setBlog(blogData);

        // fetch recent blogs (category-aware)
        const recentRes = await fetch(
          `/api/blogs?limit=3&sort=recent${categoryParam ? `&category=${encodeURIComponent(categoryParam)}` : ""
          }`
        );
        const recentData = await recentRes.json();
        setRecentBlogs(recentData.blogs);
        setHasMore(recentData.hasMore);

        // fetch categories
        const catRes = await fetch(`/api/categories`);
        const catData = await catRes.json();
        setCategories(catData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug, categoryParam]);

  // ✅ Load more blogs (pagination)
  const loadMoreBlogs = async () => {
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const res = await fetch(
        `/api/blogs?page=${nextPage}&limit=3&sort=recent${categoryParam ? `&category=${encodeURIComponent(categoryParam)}` : ""
        }`
      );
      const data = await res.json();
      setRecentBlogs((prev) => [...prev, ...data.blogs]);
      setPage(nextPage);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SkeletonBox className="h-10 w-3/4 mb-6" />
          <SkeletonBox className="h-64 w-full mb-6 rounded-xl" />
          <SkeletonBox className="h-6 w-1/3 mb-4" />
          <SkeletonBox className="h-40 w-full" />
        </div>
        <div className="hidden lg:block">
          <SkeletonBox className="h-40 w-full mb-6" />
          <SkeletonBox className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="container mx-auto px-4 py-12 grid lg:grid-cols-3 gap-8">
      {/* Main Blog */}
      <article className="lg:col-span-2" style={{ color: "var(--foreground)" }}>
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          {blog.title}
        </motion.h1>

        {/* Author + Date */}
        <div className="flex items-center gap-4 text-sm opacity-80 mb-6">
          <span className="flex items-center gap-2">
            <User size={16} /> {blog.author || "Abdul Ghaffar"}
          </span>
          <span className="flex items-center gap-2">
            <Calendar size={16} />{" "}
            {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Cover Image */}
        {blog.coverImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="mb-8 overflow-hidden rounded-xl relative w-full aspect-[16/9]"
          >
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
          </motion.div>

        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {constructBlog(blog.content)}
        </div>

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10">
            {blog.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-sm rounded-full"
                style={{
                  background: "var(--surface)",
                  color: "var(--primary)",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* Sidebar */}
      <aside className="space-y-8">
        {/* Author Card */}
        <div
          className="p-6 rounded-xl shadow-md text-center"
          style={{ background: "var(--surface)" }}
        >
          <div className="bg-background rounded-full border border-border mx-auto mb-4 w-20 h-20 flex items-center justify-center overflow-hidden">
            <Image
              width={100}
              height={100}
              src="https://iabdulghaffar.com/_next/image?url=%2Fprofile.png&w=256&q=100"
              alt="author"
              className="w-full h-auto object-contain object-top"
            />
          </div>
          <h4 className="font-semibold">{blog.author || "Abdul Ghaffar"}</h4>
          <p className="text-sm opacity-70 mt-2">
            Passionate writer who loves sharing ideas and knowledge.
          </p>
        </div>

        {/* Recent Blogs */}
        <div>
          <h3 className="font-semibold mb-4">Recent Blogs</h3>
          <div className="space-y-4">
            {recentBlogs.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-3 rounded-lg p-2"
                style={{ background: "var(--surface)" }}
              >
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs opacity-70">
                    {new Date(item.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* See More */}
          {hasMore && !loadingMore && (
            <div className="flex justify-center mt-4">
              {loadingMore ? (
                <Loader size={24} />
              ) : (
                <button
                  onClick={loadMoreBlogs}
                  className="px-4 py-2 text-sm rounded-full"
                  style={{
                    background: "var(--primary)",
                    color: "white",
                  }}
                >
                  See More
                </button>
              )}
            </div>)}
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-4">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <Link
                href={`/blogs?category=${encodeURIComponent(cat.name)}`}
                key={i}
                className="px-3 py-1 text-sm rounded-full"
                style={{
                  background: "var(--surface)",
                  color: "var(--primary)",
                }}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
