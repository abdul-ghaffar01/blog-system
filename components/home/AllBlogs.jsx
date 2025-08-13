"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card"; // Your existing Card
import blogs from "../blogs";
import Button from "../ui/Button";

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
                    <motion.div
                        key={blog.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Card className="group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[var(--primary)]/20">
                            {/* Blog Image with hover zoom */}
                            <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
                                <Image
                                    src={blog.image}
                                    alt={blog.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Blog Title */}
                            <h3
                                className="text-lg font-semibold mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-[var(--primary)]"
                                style={{ color: "var(--foreground)" }}
                            >
                                {blog.title}
                            </h3>

                            {/* Blog Description */}
                            <p
                                className="text-sm mb-3 line-clamp-3"
                                style={{ color: "var(--muted)" }}
                            >
                                {blog.description}
                            </p>

                            {/* Meta Info */}
                            <div
                                className="flex items-center justify-between text-xs"
                                style={{ color: "var(--muted)" }}
                            >
                                <span>{blog.date}</span>
                                <span>{blog.views} views</span>
                            </div>
                        </Card>
                    </motion.div>
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
