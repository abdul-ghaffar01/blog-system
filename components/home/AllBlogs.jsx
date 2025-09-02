"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "../ui/Button";
import BlogCard from "../ui/BlogCard";
import SkeletonBox from "../ui/skeletons/SkeletonBox";

export default function AllBlogsSection() {
    const [loading, setLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [hasMoreBlogs, setHasMoreBlogs] = useState(false);
    const [displayedBlogs, setDisplayedBlogs] = useState([]);

    // Fetch blogs from API
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch("/api/blogs?sort=recent&limit=9");
                const data = await res.json();

                setDisplayedBlogs(data.blogs);
                setHasMoreBlogs(data.hasMore);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <section className="py-12 px-2 md:px-4">
            <h2
                className="text-2xl font-bold mb-8 text-center"
                style={{ color: "var(--foreground)" }}
            >
                All Blogs
            </h2>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading
                    ? Array.from({ length: 9 }).map((_, idx) => (
                        <SkeletonBox key={idx} className="h-64 w-full rounded-xl" />
                    ))
                    : displayedBlogs.map((blog, idx) => (
                        <BlogCard key={idx} blog={blog} idx={idx} />
                    ))}
            </div>

            {/* See More Button */}
            {hasMoreBlogs && !loading && (
                <div className="mt-10 text-center mx-auto w-fit">
                    <Link
                        href="/blogs"
                        className="rounded-lg text-sm"
                        style={{
                            background: "var(--primary)",
                            color: "#fff",
                        }}
                    >
                        <Button
                            loading={btnLoading}
                            onClick={() => {
                                setBtnLoading(true);
                            }}
                        >
                            See all blogs
                        </Button>
                    </Link>
                </div>
            )}
        </section>
    );
}
