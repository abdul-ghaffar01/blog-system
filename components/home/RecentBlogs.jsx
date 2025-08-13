import BlogCarousel from "../ui/BlogCrousel";
import blogs from "../blogs";
export default function RecentBlogsSection() {

    return (
        <section className="py-12 my-10">
            <div className="container mx-auto px-4">
                <h2
                    className="text-2xl md:text-3xl font-bold mb-6 text-left"
                    style={{ color: "var(--foreground)" }}
                >
                    Recently Added Blogs
                </h2>
                <BlogCarousel blogs={blogs} />
            </div>
        </section>
    );
}
