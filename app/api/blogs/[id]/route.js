// app/api/blogs/[id]/route.js
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import jwt from "jsonwebtoken";
import { rm } from "fs/promises";
import path from "path";
import mongoose from "mongoose";

// GET blog (by id or slug)
export async function GET(req, context) {
  try {
    await connectDB();

    const { id } = await context.params; // ✅ await params
    let filter;

    if (mongoose.Types.ObjectId.isValid(id)) {
      filter = { $or: [{ _id: id }, { slug: id }] };
    } else {
      filter = { slug: id };
    }

    const blog = await Blog.findOne(filter);

    if (!blog) {
      return new Response(
        JSON.stringify({ message: "Blog not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(blog), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch blog" }),
      { status: 500 }
    );
  }
}

// UPDATE blog
export async function PUT(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const data = await req.json();

    // 🔹 Auth check
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ message: "Unauthorized ❌" }), {
        status: 401,
      });
    }

    try {
      jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET);
    } catch {
      return new Response(JSON.stringify({ message: "Invalid token ❌" }), {
        status: 401,
      });
    }

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
      "content",
    ];

    const updates = {};
    for (let field of allowedFields) {
      if (data[field] !== undefined) updates[field] = data[field];
    }

    const filter = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { slug: id };
    const updatedBlog = await Blog.findOneAndUpdate(filter, updates, { new: true });

    if (!updatedBlog) {
      return new Response(JSON.stringify({ message: "Blog not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedBlog), { status: 200 });
  } catch (error) {
    console.error("Error updating blog:", error);
    return new Response(
      JSON.stringify({ message: "Failed to update blog" }),
      { status: 500 }
    );
  }
}

// DELETE blog
export async function DELETE(req, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    // 🔹 Auth
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ message: "Unauthorized ❌" }), {
        status: 401,
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET);
    } catch {
      return new Response(JSON.stringify({ message: "Invalid or expired token ❌" }), {
        status: 401,
      });
    }

    // 🔹 Delete blog
    const filter = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { slug: id };
    const blog = await Blog.findOne(filter);
    if (!blog) {
      return new Response(JSON.stringify({ message: "Blog not found ❌" }), {
        status: 404,
      });
    }

    await Blog.deleteOne(filter);

    // 🔹 Delete blog’s images folder
    const folderPath = path.join(process.cwd(), "public", "uploads", blog._id.toString());
    try {
      await rm(folderPath, { recursive: true, force: true });
      console.log(`🗑️ Deleted images folder for blog ${id}`);
    } catch (err) {
      console.warn("Failed to delete blog images folder:", err.message);
    }

    return new Response(
      JSON.stringify({ message: "Blog and images deleted successfully ✅" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return new Response(
      JSON.stringify({ message: "Failed to delete blog ❌" }),
      { status: 500 }
    );
  }
}
