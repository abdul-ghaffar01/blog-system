import React from 'react'
import { motion } from "framer-motion";
import Image from "next/image";
const BlogCard = ({ blog, idx }) => {
    return (
        <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            viewport={{ once: true }}
            className="px-3"
        >
            <div
                className="rounded-xl overflow-hidden shadow-lg border"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
                <div className="relative w-full h-48">
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="p-4">
                    <h3
                        className="text-lg font-semibold mb-2 line-clamp-2"
                        style={{ color: "var(--foreground)" }}
                    >
                        {blog.title}
                    </h3>
                    <p
                        className="text-sm mb-3 line-clamp-3"
                        style={{ color: "var(--muted)" }}
                    >
                        {blog.description}
                    </p>
                    <div
                        className="flex items-center justify-between text-xs"
                        style={{ color: "var(--muted)" }}
                    >
                        <span>{blog.date}</span>
                        <span>{blog.views} views</span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default BlogCard