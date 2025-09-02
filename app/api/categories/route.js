
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET(req) {
    try {
        await connectDB();

        // Aggregate unique categories and count blogs in each
        const categories = await Blog.aggregate([
            {
                $match: { status: "published" } // Only consider published blogs
            },
            {
                $group: {
                    _id: "$category", // Group by category field
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id",
                    count: 1,
                },
            },
            {
                $sort: { name: 1 }, // Sort alphabetically
            },
        ]);

        return new Response(JSON.stringify(categories), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return new Response(
            JSON.stringify({ message: "Failed to fetch categories" }),
            { status: 500 }
        );
    }
}
