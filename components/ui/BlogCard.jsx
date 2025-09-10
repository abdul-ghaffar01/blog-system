import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Eye } from "lucide-react";
import Link from "next/link";

const BlogCard = ({ blog, idx }) => {
  return (
    <Link href={`/blogs/${blog.slug}`}>

      <motion.div
        key={blog._id}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: idx * 0.15 }}
        viewport={{ once: true }}
        className="px-3"
      >
        <div
          className="rounded-xl overflow-hidden shadow-lg border"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          {/* Cover Image */}
          <div className="relative w-full h-48">
            <Image
              src={blog.coverImage || "/uploads/default.png"}
              alt={blog.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Title */}
            <h3
              className="text-lg font-semibold mb-2 line-clamp-2"
              style={{ color: "var(--foreground)" }}
            >
              {blog.title}
            </h3>

            {/* Excerpt */}
            <p
              className="text-sm mb-3 line-clamp-3"
              style={{ color: "var(--muted)" }}
            >
              {blog.excerpt}
            </p>

            {/* Meta */}
            <div
              className="flex items-center justify-between text-xs"
              style={{ color: "var(--muted)" }}
            >
              <span>
                {blog.publishedAt
                  ? new Date(blog.publishedAt).toLocaleDateString()
                  : "Draft"}
              </span>
              <span className="flex text-xs items-center gap-1">
                <Eye size={16} color="currentColor" /> {blog.views || 0}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default BlogCard;
