import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Heart } from "lucide-react";
import Button from "../ui/Button";

const BlogCard = ({ blog }) => {
    return (
        <div
            className="rounded-xl overflow-hidden shadow-md border"
            style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
            }}
        >
            {/* Cover Image */}
            <div className="relative w-full h-40">
                <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold line-clamp-2">
                    {blog.title}
                </h3>
                <p className="text-sm line-clamp-2" style={{ color: "var(--muted)" }}>
                    {blog.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs">
                    <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                    <div className="flex gap-3 items-center">
                        <span className="flex items-center gap-1">
                            <Eye size={14} /> {blog.views}
                        </span>
                        <span className="flex items-center gap-1">
                            <Heart size={14} /> {blog.likes}
                        </span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 mt-3">
                    {/* View Info */}
                    <Link href={`/admin/panel/blog-info/${blog._id}`}>
                        <Button
                            className="px-3 py-1 rounded-md text-sm font-medium"
                            variant="secondary"
                        >
                            View Info
                        </Button>
                    </Link>

                    {/* Edit */}
                    <Link href={`/admin/panel/edit/${blog._id}`}>
                        <Button
                            className="px-3 py-1 rounded-md text-sm font-medium"
                            variant="success"
                        >
                            Edit
                        </Button>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default BlogCard;
