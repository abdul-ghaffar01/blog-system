"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import SkeletonBox from "@/components/ui/skeletons/SkeletonBox";
import MainBlog from "@/components/blog_page/MainBlog";
import SideBar from "@/components/blog_page/SideBar";
import BlogNotFound from "@/components/blog_page/BlogNotFound";


export default function BlogPage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

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
      <div className="container mx-auto px-4 py-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SkeletonBox className="h-10 w-3/4 mb-6" />
          <SkeletonBox className="h-64 w-full mb-6 rounded-xl" />
          <SkeletonBox className="h-6 w-1/3 mb-4" />
          <SkeletonBox className="h-40 w-full" />
        </div>
        <div className="hidden lg:block">
          <SkeletonBox className="h-40 w-full mb-6" />
          <SkeletonBox className="h-64 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 grid lg:grid-cols-3 gap-8">

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
