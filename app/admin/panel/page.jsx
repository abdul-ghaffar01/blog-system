// app/admin/panel/page.jsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { Edit, Trash2, Eye, Heart } from "lucide-react";
import BlogCard from "@/components/admin/BlogCard";

const AdminPanel = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch("/api/blogs?limit=100"); // fetch all
                const data = await res.json();
                setBlogs(data.blogs || []);
            } catch (err) {
                console.error("Error fetching blogs:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) return <p className="p-6">Loading blogs...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Admin Panel - Blogs</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />

                ))}
            </div>
        </div>
    );
};

export default AdminPanel;
