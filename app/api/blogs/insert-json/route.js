import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import mongoose from "mongoose";

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();

        // Normalize input: wrap single object into an array
        const blogs = Array.isArray(body) ? body : [body];

        // ✅ Process _id for each document
        const preparedBlogs = blogs.map((doc) => {
            if (doc._id) {
                try {
                    doc._id = new mongoose.Types.ObjectId(doc._id);
                } catch {
                    throw new Error(`Invalid _id format: ${doc._id}`);
                }
            }
            return doc;
        });

        // ✅ Insert into DB
        const inserted = await Blog.insertMany(preparedBlogs, {
            ordered: false, // continue on errors if multiple
        });

        return new Response(JSON.stringify(inserted), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("Error inserting JSON blogs:", err);
        return new Response(
            JSON.stringify({ message: err.message || "Failed to insert blogs ❌" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
