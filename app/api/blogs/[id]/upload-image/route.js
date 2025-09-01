// app/api/blogs/[id]/upload/route.js
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

// 🔹 POST /api/blogs/:id/upload
export async function POST(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const formData = await req.formData();
    const file = formData.get("image");
    const field = formData.get("field"); // coverImage OR ogImage

    if (!file || !["coverImage", "ogImage"].includes(field)) {
      return new Response(
        JSON.stringify({ message: "Invalid upload request ❌" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 🔹 Get the blog
    const blog = await Blog.findById(id);
    if (!blog) {
      return new Response(
        JSON.stringify({ message: "Blog not found ❌" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // 🔹 Create folder for this blog's slug if it doesn't exist
    const folderPath = path.join(process.cwd(), "public/uploads", blog.slug);
    if (!fs.existsSync(folderPath)) {
      await mkdir(folderPath, { recursive: true });
    }

    // 🔹 Delete old file if exists
    if (blog[field] && blog[field].startsWith(`/uploads/${blog.slug}/`)) {
      try {
        await unlink(path.join(process.cwd(), "public", blog[field]));
      } catch (err) {
        console.warn("Failed to delete old image:", err.message);
      }
    }

    // 🔹 Save new file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${field}-${Date.now()}-${file.name}`;
    const filePath = path.join(folderPath, filename);

    await writeFile(filePath, buffer);

    // 🔹 Update DB with new path
    const newUrl = `/uploads/${blog.slug}/${filename}`;
    blog[field] = newUrl;
    await blog.save();

    return new Response(
      JSON.stringify({ url: newUrl }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Image upload error:", error);
    return new Response(
      JSON.stringify({ message: "Image upload failed ❌" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
