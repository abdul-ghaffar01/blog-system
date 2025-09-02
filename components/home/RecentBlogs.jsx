import BlogCarousel from "../ui/BlogCrousel";
import { useEffect, useState } from "react";
import SkeletonCarousel from "../ui/skeletons/SkeletonCarousel";

export default function RecentBlogsSection() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch("/api/blogs?sort=recent&limit=5");
                const data = await res.json();
                setBlogs(data.blogs || []);
            } catch (err) {
                console.error("Error fetching featured blogs:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <section className="py-12 my-10 w-full">
            <div className="container mx-auto px-4 w-full">
                <h2
                    className="text-2xl md:text-3xl font-bold mb-6 text-left"
                    style={{ color: "var(--foreground)" }}
                >
                    Recently Added Blogs
                </h2>

                {loading ? (
                    <SkeletonCarousel />
                ) : (
                    <BlogCarousel blogs={blogs} />
                )}
            </div>
        </section>
    );
}
