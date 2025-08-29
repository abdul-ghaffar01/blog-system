// app/api/blogs/route.js  (Next.js 13+ with App Router)
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET(req) {
    try {
        await connectDB();

        // exclude `content` field
        const blogs = await Blog.find({}, { content: 0 }).sort({ createdAt: -1 });

        return new Response(JSON.stringify(blogs), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ message: "Failed to fetch blogs" }),
            { status: 500 }
        );
    }
}
