// app/api/blogs/insert-json/route.js
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

function normalizeDates(obj) {
    const dateFields = ["publishedAt", "createdAt", "updatedAt"];
    for (const field of dateFields) {
        if (obj[field] && obj[field].$date) {
            obj[field] = new Date(obj[field].$date);
        }
    }
    return obj;
}

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        const blogs = Array.isArray(body) ? body : [body];

        const results = [];

        for (const blogData of blogs) {
            try {
                // 🔹 Remove _id so MongoDB generates new one
                const { _id, ...rest } = blogData;

                // 🔹 Fix Mongo Extended JSON dates
                const normalized = normalizeDates(rest);

                // 🔹 Save blog
                const blog = new Blog(normalized);
                await blog.save();

                results.push({ success: true, blog });
            } catch (err) {
                results.push({
                    success: false,
                    error: err.message,
                    input: blogData,
                });
            }
        }

        return new Response(
            JSON.stringify({
                message: `Processed ${blogs.length} blogs`,
                inserted: results.filter(r => r.success).length,
                failed: results.filter(r => !r.success).length,
                results,
            }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (err) {
        console.error("Error inserting blogs:", err);
        return new Response(
            JSON.stringify({ message: "Error inserting blogs", error: err.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
