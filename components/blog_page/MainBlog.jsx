import React from 'react'
import constructBlog from "@/utils/constructBlog";
import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";
import Image from 'next/image';

const MainBlog = ({ blog }) => {
    return (
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

    )
}

export default MainBlog