"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card"; // Your existing Card
import blogs from "../blogs";
import Button from "../ui/Button";
import BlogCard from "../ui/BlogCard";

export default function AllBlogsSection() {
    const [btnLoading, setBtnLoading] = useState(false)
    const [hasMoreBlogs, setHasMoreBlogs] = useState(false);
    const displayedBlogs = blogs.slice(0, 9);

    return (
        <section className="py-12 px-2 md:px-4">
            <h2
                className="text-2xl font-bold mb-8 text-center"
                style={{ color: "var(--foreground)" }}
            >
                All Blogs
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedBlogs.map((blog, idx) => (
                    <BlogCard key={idx} blog={blog} idx={idx} />
                ))}
            </div>

            {/* See More Button */}
            {hasMoreBlogs && <div className="mt-10 text-center mx-auto w-fit">
                <Link
                    href="/blogs"
                    className="rounded-lg text-sm "
                    style={{
                        background: "var(--primary)",
                        color: "#fff",
                    }}
                >
                    <Button loading={btnLoading} onClick={() => { setBtnLoading(true) }}>
                        See all blogs
                    </Button>
                </Link>
            </div>}
        </section>
    );
}
