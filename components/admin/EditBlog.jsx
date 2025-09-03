"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import constructBlog from "@/utils/constructBlog";

export default function EditBlog({ id }) {
    const router = useRouter();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [isDeleteRequestProcessing, setIsDeleteRequestProcessing] =
        useState(false);
    const [message, setMessage] = useState({});
    const [editClicked, setEditClicked] = useState(false);

    // Fetch blog
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`/api/blogs/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setBlog(data);
                }
            } catch (err) {
                console.error("Error fetching blog:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBlog({
            ...blog,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const token = localStorage.getItem("token");

            const res = await fetch(`/api/blogs/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(blog),
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage({
                    open: true,
                    title: "Error",
                    message: data.message || "Failed to save blog ❌",
                });
                return;
            }

            setMessage({
                open: true,
                title: "Success",
                message: "Blog updated successfully ✅",
            });
        } catch (err) {
            console.error("Error saving blog:", err);
            setMessage({
                open: true,
                title: "Error",
                message: "Something went wrong ❌",
            });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        setIsDeleteRequestProcessing(true);
        try {
            const token = localStorage.getItem("accessToken");
            await fetch(`/api/blogs/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            router.push("/admin/panel");
        } catch (err) {
            console.error("Error deleting blog:", err);
        } finally {
            setIsDeleteRequestProcessing(false);
            setDeleting(false);
        }
    };

    const handleImageUpload = async (e, field) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const formData = new FormData();
            formData.append("image", file);
            formData.append("field", field);

            const res = await fetch(`/api/blogs/${blog._id}/upload-image`, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Failed to upload image");

            const data = await res.json();

            setBlog({
                ...blog,
                [field]: data.url,
            });
        } catch (err) {
            console.error("Image upload failed:", err);
        }
    };


    if (loading) return <p className="p-6">Loading blog...</p>;
    if (!blog) return <p className="p-6">Blog not found.</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Edit Blog</h1>
                <button
                    onClick={() => setDeleting(true)}
                    disabled={deleting}
                    className="px-4 py-2 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
                >
                    {deleting ? "Deleting..." : "Delete Blog"}
                </button>
            </header>


            {/* General Info */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold  pb-2">General</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={blog.title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-md border border-border"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Slug</label>
                        <input
                            type="text"
                            name="slug"
                            value={blog.slug}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-md border border-border"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={blog.category}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-md border border-border"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Tags</label>
                        <input
                            type="text"
                            name="tags"
                            value={blog.tags.join(",")}
                            onChange={(e) =>
                                setBlog({
                                    ...blog,
                                    tags: e.target.value.split(",").map((t) => t.trim()),
                                })
                            }
                            placeholder="Comma separated"
                            className="w-full px-3 py-2 rounded-md border border-border"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Excerpt</label>
                    <textarea
                        name="excerpt"
                        value={blog.excerpt || ""}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 rounded-md border border-border"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Cover Image</label>

                    {/* Current URL */}
                    <input
                        type="text"
                        name="coverImage"
                        value={blog.coverImage || ""}
                        readOnly
                        className="w-full px-3 py-2 rounded-md mb-2 bg-surface"
                    />

                    {/* Preview */}
                    {blog.coverImage && (
                        <img
                            src={blog.coverImage}
                            alt="Cover Preview"
                            className="w-48 h-28 object-cover rounded-md mb-2 border border-border"
                        />
                    )}

                    {/* File Upload */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "coverImage")}
                        className="block w-full border border-border p-2 text-sm text-gray-600"
                    />
                </div>


            </section>

            {/* Status & Flags */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold  pb-2">Status</h2>
                <div className="flex flex-wrap gap-6 items-center">
                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select
                            name="status"
                            value={blog.status}
                            onChange={handleChange}
                            className="px-3 py-2 rounded-md border border-border"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2 mt-6">
                        <input
                            type="checkbox"
                            name="isFeatured"
                            checked={blog.isFeatured}
                            onChange={handleChange}
                        />
                        <label className="text-sm font-medium">Featured</label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Published At</label>
                        <input
                            type="datetime-local"
                            name="publishedAt"
                            value={
                                blog.publishedAt
                                    ? new Date(blog.publishedAt).toISOString().slice(0, 16)
                                    : ""
                            }
                            onChange={handleChange}
                            className="px-3 py-2 rounded-md border border-border"
                        />
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold pb-2">Stats</h2>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Views</label>
                        <input
                            type="number"
                            name="views"
                            value={blog.views}
                            onChange={handleChange}
                            className="px-3 py-2 rounded-md border border-border"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Likes</label>
                        <input
                            type="number"
                            name="likes"
                            value={blog.likes}
                            onChange={handleChange}
                            className="px-3 py-2 rounded-md border border-border"
                        />
                    </div>
                </div>
            </section>

            {/* SEO */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold pb-2">SEO</h2>
                <div>
                    <label className="block text-sm font-medium mb-1">Meta Title</label>
                    <input
                        type="text"
                        name="metaTitle"
                        value={blog.metaTitle || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-md border border-border"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Meta Description</label>
                    <textarea
                        name="metaDescription"
                        value={blog.metaDescription || ""}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 rounded-md border border-border"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">OG Image</label>

                    {/* Current URL */}
                    <input
                        type="text"
                        name="ogImage"
                        value={blog.ogImage || ""}
                        readOnly
                        className="w-full px-3 py-2 rounded-md border border-border mb-2 bg-surface"
                    />

                    {/* Preview */}
                    {blog.ogImage && (
                        <img
                            src={blog.ogImage}
                            alt="OG Preview"
                            className="w-48 h-28 object-cover rounded-md mb-2 border"
                        />
                    )}

                    {/* File Upload */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "ogImage")}
                        className="block w-full border border-border p-2 text-sm text-gray-600"
                    />
                </div>

            </section>

            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            {/* Preview of the blog */}
            <hr />
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Preview of the blog</h2>
                <Button loading={editClicked} variant="success" onClick={() => { router.push(`/admin/panel/edit/${blog._id}`); setEditClicked(true); }}>
                    Edit Blog
                </Button>
            </div>
            {blog.content.length > 0 ? constructBlog(blog) : <p className='p-6 text-center text-muted' >No content available.</p>}

            {/* Delete Modal */}
            <Modal isOpen={deleting} onClose={() => setDeleting(false)}>
                <div className="p-2">
                    <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                    <p className="mb-6">
                        Are you sure you want to delete <strong>{blog?.title}</strong>?
                    </p>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setDeleting(false)}
                            className="px-4 py-2 rounded bg-background border border-border hover:bg-surface"
                        >
                            Cancel
                        </button>
                        <Button
                            loading={isDeleteRequestProcessing}
                            onClick={handleDelete}
                            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Message Modal */}
            <Modal isOpen={message.open} onClose={() => setMessage({})}>
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-4">{message.title}</h2>
                    <p className="whitespace-pre-wrap">{message.message}</p>
                    <div className="flex justify-end mt-6">
                        <Button onClick={() => setMessage({})}>Close</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
