// app/api/blogs/[id]/route.js
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import jwt from "jsonwebtoken";
import { rm } from "fs/promises";
import path from "path";

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


// app/api/blogs/[id]/route.js
export async function PUT(req, { params }) {
  await connectDB();
  const { id } = params;
  const data = await req.json();

  // Only allow certain fields
  const allowedFields = [
    "title",
    "slug",
    "category",
    "tags",
    "excerpt",
    "coverImage",
    "ogImage",
    "status",
    "isFeatured",
    "publishedAt",
    "views",
    "likes",
    "metaTitle",
    "metaDescription",
    "content"
  ];

  const updates = {};
  for (let field of allowedFields) {
    if (data[field] !== undefined) {
      updates[field] = data[field];
    }
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, updates, { new: true });

  if (!updatedBlog) {
    return new Response(JSON.stringify({ message: "Blog not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(updatedBlog), { status: 200 });
}


// DELETE blog
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    // 🔹 Auth
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ message: "Unauthorized ❌" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return new Response(
        JSON.stringify({ message: "Invalid or expired token ❌" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // 🔹 Delete blog
    const { id } = params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return new Response(
        JSON.stringify({ message: "Blog not found ❌" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    await Blog.findByIdAndDelete(id);

    // 🔹 Delete blog’s images folder
    // (assuming you store them in /public/uploads/{blog._id} or /public/uploads/{blog.slug})
    const folderPath = path.join(process.cwd(), "public", "uploads", blog._id.toString());
    try {
      await rm(folderPath, { recursive: true, force: true });
      console.log(`🗑️ Deleted images folder for blog ${id}`);
    } catch (err) {
      console.warn("Failed to delete blog images folder:", err.message);
    }

    return new Response(
      JSON.stringify({ message: "Blog and images deleted successfully ✅" }),
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
