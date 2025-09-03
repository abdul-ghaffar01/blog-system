import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        let blogs = Array.isArray(body) ? body : [body];

        blogs = blogs.map((blog) => {
            if (blog._id && blog._id.$oid) {
                blog._id = new mongoose.Types.ObjectId(blog._id.$oid);
            } else if (blog._id && typeof blog._id === "string") {
                blog._id = new mongoose.Types.ObjectId(blog._id);
            }
            return blog;
        });

        const result = await Blog.insertMany(blogs, { ordered: false });

        return new Response(
            JSON.stringify({ message: "Blogs inserted ✅", result }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (err) {
        console.error("Error inserting JSON blogs:", err);
        return new Response(
            JSON.stringify({ message: "Error inserting blogs ❌", error: err.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
