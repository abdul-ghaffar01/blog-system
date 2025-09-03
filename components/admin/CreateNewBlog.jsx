"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import uniqueId from "@/utils/uniqueId";

const emptyBlog = {
  title: "New blog",
  slug: uniqueId(),
  category: "New",
  tags: [],
  excerpt: "",
  coverImage: "/uploads/default.png",
  ogImage: "/uploads/default.png",
  status: "draft",
  isFeatured: false,
  publishedAt: Date.now(),
  views: 0,
  likes: 0,
  author: "Abdul Ghaffar",
  metaTitle: "",
  metaDescription: "",
  content: [],
};

export default function CreateNewBlog() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({});
  const [jsonInput, setJsonInput] = useState("{\n  \"title\": \"My Blog Title\"\n}");

  // ✅ Old logic: create a new draft blog
  const handleCreate = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");

      const res = await fetch(`/api/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(emptyBlog),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({
          open: true,
          title: "Error",
          message: data.message || "Failed to create blog ❌",
        });
        return;
      }

      router.replace(`/admin/panel/blog-info/${data._id}`);
    } catch (err) {
      console.error("Error creating blog:", err);
      setMessage({
        open: true,
        title: "Error",
        message: "Something went wrong ❌",
      });
    } finally {
      setSaving(false);
    }
  };

  // ✅ New logic: insert raw JSON
  const handleJsonSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");

      let parsed;
      try {
        parsed = JSON.parse(jsonInput);
      } catch (err) {
        setMessage({
          open: true,
          title: "Invalid JSON",
          message: "Please check your JSON format ❌",
        });
        return;
      }

      const res = await fetch(`/api/blogs/insert-json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(parsed),
      });

      const data = await res.json();
      console.log("Insert JSON response:", data);

      if (!res.ok) {
        setMessage({
          open: true,
          title: "Error",
          message: data.message || "Failed to insert blog ❌",
        });
        return;
      }

      router.replace(`/admin/panel/blog-info/${data._id}`);
    } catch (err) {
      console.error("Error inserting blog:", err);
      setMessage({
        open: true,
        title: "Error",
        message: "Something went wrong ❌",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Create Blog</h1>
      <p className="text-muted-foreground">
        You can either create a draft blog or insert a custom JSON.
      </p>

      {/* --- Draft blog creation --- */}
      <div className="flex justify-end">
        <button
          onClick={handleCreate}
          disabled={saving}
          className="px-6 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Creating..." : "Create Draft Blog"}
        </button>
      </div>

      {/* --- JSON Insertion --- */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Insert via JSON</h2>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="w-full h-64 p-3 rounded-lg border font-mono text-sm"
        />
        <div className="flex justify-end">
          <button
            onClick={handleJsonSave}
            disabled={saving}
            className="px-6 py-2 rounded-lg font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save JSON"}
          </button>
        </div>
      </div>

      {/* --- Message Modal --- */}
      <Modal isOpen={message.open} onClose={() => setMessage({})}>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">{message.title}</h2>
          <p>{message.message}</p>
          <div className="flex justify-end mt-6">
            <Button onClick={() => setMessage({})}>Close</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
