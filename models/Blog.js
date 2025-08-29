import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },
        excerpt: {
            type: String,
            maxlength: 300, // short summary for previews
        },
        content: {
            type: Object, // JSON (from your editor)
            required: true,
        },
        category: {
            type: String,
            required: true,
            index: true,
        },
        tags: [
            {
                type: String,
                trim: true,
                lowercase: true,
            },
        ],
        coverImage: {
            type: String, // URL
        },
        status: {
            type: String,
            enum: ["draft", "published", "archived"],
            default: "draft",
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        views: {
            type: Number,
            default: 0,
        },
        likes: {
            type: Number,
            default: 0,
        },
        // SEO fields
        metaTitle: {
            type: String,
        },
        metaDescription: {
            type: String,
        },
        ogImage: {
            type: String, // social preview image
        },
        publishedAt: {
            type: Date,
        },
    },
    {
        timestamps: true, // adds createdAt & updatedAt
    }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
