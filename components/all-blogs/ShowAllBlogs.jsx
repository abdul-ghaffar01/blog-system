"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BlogCard from "@/components/ui/BlogCard";
import Button from "@/components/ui/Button";
import Link from "next/link";
import BlogFilters from "./BlogFilters";

export default function ShowAllBlogs({
    featured,
    categories,
    initialBlogs,
    initialHasMore,
    initialCategory,
}) {
    const [blogs, setBlogs] = useState(initialBlogs || []);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [category, setCategory] = useState(initialCategory);
    const [sort, setSort] = useState("Newest");

    const loadMore = async () => {
        setLoadingMore(true);
        try {
            const res = await fetch(
                `/api/blogs?page=${page + 1}&limit=6&sort=${sort.toLowerCase()}${category !== "All" ? `&category=${category}` : ""
                }`
            );
            const data = await res.json();
            console.log(data);
            setBlogs((prev) => [...prev, ...data.blogs]);
            setHasMore(data.hasMore);
            setPage((p) => p + 1);
        } finally {
            setLoadingMore(false);
        }
    };

    return (
        <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
            {/* Featured */}
            {featured && (
                <motion.section
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative rounded-2xl overflow-hidden shadow-md"
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
                {/* Sidebar */}
                <BlogFilters
                    categories={categories}
                    category={category}
                    setCategory={setCategory}
                    sort={sort}
                    setSort={setSort}
                    setPage={setPage}
                    setBlogs={setBlogs}
                    setHasMore={setHasMore}
                />

                {/* Blog Grid */}
                <div className="flex-1">
                    <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {blogs.map((blog, i) => (
                            <BlogCard key={blog._id} blog={blog} idx={i} />
                        ))}
                    </motion.div>

                    {hasMore && (
                        <div className="text-center mt-8">
                            <Button
                                loading={loadingMore}
                                onClick={loadMore}
                                className="px-6 py-2 rounded-lg font-medium bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition"
                            >
                                See more
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
