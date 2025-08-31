// app/api/blogs/[id]/route.js
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import jwt from "jsonwebtoken";

export async function GET(req, { params }) {
    try {
        await connectDB();

        const { id } = params; // blog id from URL
        const blog = await Blog.findById(id);

        if (!blog) {
            return new Response(JSON.stringify({ message: "Blog not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
        }

        return new Response(JSON.stringify(blog), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        console.error("Error fetching blog:", error);
        return new Response(JSON.stringify({ message: "Failed to fetch blog" }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
}


// DELETE blog
export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const SECRET_KEY = process.env.JWT_SECRET; // Make sure to set this in your .env

        // 🔹 Get the token from headers
        const authHeader = req.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return new Response(
                JSON.stringify({ message: "Unauthorized ❌" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        const token = authHeader.split(" ")[1];

        // 🔹 Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            console.log(err)
            return new Response(
                JSON.stringify({ message: "Invalid or expired token ❌" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        // You can optionally check user role here if needed
        // e.g., if (!decoded.isAdmin) return 403 Forbidden

        const { id } = params;
        const blog = await Blog.findById(id);

        if (!blog) {
            return new Response(
                JSON.stringify({ message: "Blog not found" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        await Blog.findByIdAndDelete(id);

        return new Response(
            JSON.stringify({ message: "Blog deleted successfully ✅" }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error deleting blog:", error);
        return new Response(
            JSON.stringify({ message: "Failed to delete blog ❌" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}