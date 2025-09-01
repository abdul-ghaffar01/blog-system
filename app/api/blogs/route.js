// app/api/blogs/route.js
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

// ✅ GET all blogs (paginated)
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 6;
    const skip = (page - 1) * limit;

    const total = await Blog.countDocuments();

    const blogs = await Blog.find({}, { content: 0 })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const hasMore = page * limit < total;

    return new Response(
      JSON.stringify({ blogs, hasMore, total }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch blogs" }),
      { status: 500 }
    );
  }
}


// app/api/blogs/route.js
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const blog = new Blog(body);
    await blog.save();

    return new Response(JSON.stringify(blog), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating blog:", error);

    // 🔹 Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      return new Response(
        JSON.stringify({
          message: "Validation failed",
          errors: Object.fromEntries(
            Object.entries(error.errors).map(([field, err]) => [field, err.message])
          ),
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ message: "Failed to create blog" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
