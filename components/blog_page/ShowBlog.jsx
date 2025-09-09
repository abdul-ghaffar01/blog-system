"use client";

import React, { useEffect, useState } from "react";
import MainBlog from "@/components/blog_page/MainBlog";
import SideBar from "@/components/blog_page/SideBar";
import BlogNotFound from "@/components/blog_page/BlogNotFound";
import BlogSkeleton from "@/components/ui/skeletons/BlogSkeleton";


export default function ShowBlog({ slug, categoryParam }) {
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
                if (blogRes.ok)
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
            <BlogSkeleton />
        );
    }

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {blog ? <MainBlog blog={blog} /> : <BlogNotFound />}
            <SideBar
                categories={categories}
                hasMore={hasMore}
                recentBlogs={recentBlogs}
                loadMoreBlogs={loadMoreBlogs}
                loadingMore={loadingMore}
            />
        </div >
    );
}
