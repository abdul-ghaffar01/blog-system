// app/api/blogs/route.js  (Next.js 13+ with App Router)
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET(req) {
  try {
    await connectDB();

    // Parse query params (page & limit)
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 6;

    const skip = (page - 1) * limit;
    console.log({ page, limit, skip });

    // total count
    const total = await Blog.countDocuments();

    // fetch blogs (exclude `content`)
    const blogs = await Blog.find({}, { content: 0 })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    console.log(blogs);
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
