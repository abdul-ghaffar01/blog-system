import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        let blogs = Array.isArray(body) ? body : [body];

        // 🔹 remove _id from all docs so Mongo generates new ones
        blogs = blogs.map(({ _id, ...rest }) => rest);

        const result = await Blog.insertMany(blogs, { ordered: false });

        return new Response(
            JSON.stringify({ message: "Blogs inserted ✅", result }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (err) {
        console.error("Error inserting JSON blogs:", err);
        return new Response(
            JSON.stringify({
                message: "Error inserting blogs ❌",
                error: err.message,
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
