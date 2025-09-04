import React from 'react'
import Image from "next/image";
import Link from "next/link";
import Loader from "@/components/Loader";


const SideBar = ({ categories, hasMore, recentBlogs, loadMoreBlogs, loadingMore }) => {


    return (
        <aside className="space-y-8 flex-1">
            {/* Author Card */}
            <div
                className="p-6 rounded-xl shadow-md text-center"
                style={{ background: "var(--surface)" }}
            >
                <div className="bg-background rounded-full border border-border mx-auto mb-4 w-20 h-20 flex items-center justify-center overflow-hidden">
                    <Image
                        width={100}
                        height={100}
                        src="https://iabdulghaffar.com/_next/image?url=%2Fprofile.png&w=256&q=100"
                        alt="author"
                        className="w-full h-auto object-contain object-top"
                    />
                </div>
                <h4 className="font-semibold">Abdul Ghaffar</h4>
                <p className="text-sm opacity-70 mt-2">
                    Passionate writer who loves sharing ideas and knowledge.
                </p>
            </div>

            {/* Recent Blogs */}
            <div>
                <h3 className="font-semibold mb-4">Recent Blogs</h3>
                <div className="space-y-4">
                    {recentBlogs.map((item) => (
                        <div
                            key={item._id}
                            className="flex items-center gap-3 rounded-lg p-2"
                            style={{ background: "var(--surface)" }}
                        >
                            <img
                                src={item.coverImage}
                                alt={item.title}
                                className="w-16 h-16 object-cover rounded-md"
                            />
                            <div>
                                <p className="font-medium">{item.title}</p>
                                <p className="text-xs opacity-70">
                                    {new Date(item.publishedAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* See More */}
                {hasMore && !loadingMore && (
                    <div className="flex justify-center mt-4">
                        {loadingMore ? (
                            <Loader size={24} />
                        ) : (
                            <button
                                onClick={loadMoreBlogs}
                                className="px-4 py-2 text-sm rounded-full"
                                style={{
                                    background: "var(--primary)",
                                    color: "white",
                                }}
                            >
                                See More
                            </button>
                        )}
                    </div>)}
            </div>

            {/* Categories */}
            <div>
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat, i) => (
                        <Link
                            href={`/blogs?category=${encodeURIComponent(cat.name)}`}
                            key={i}
                            className="px-3 py-1 text-sm rounded-full"
                            style={{
                                background: "var(--surface)",
                                color: "var(--primary)",
                            }}
                        >
                            {cat.name}
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    )
}

export default SideBar