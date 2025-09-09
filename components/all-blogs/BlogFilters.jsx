"use client";

import { Filter } from "lucide-react";

export default function BlogFilters({
  categories,
  category,
  setCategory,
  sort,
  setSort,
  setPage,
  setBlogs,
  setHasMore,
}) {
  const handleCategoryChange = async (newCategory) => {
    setCategory(newCategory);
    setPage(1);

    const res = await fetch(
      `/api/blogs?page=1&limit=6&sort=${sort.toLowerCase()}${
        newCategory !== "All" ? `&category=${newCategory}` : ""
      }`
    );
    const data = await res.json();
    setBlogs(data.blogs);
    setHasMore(data.hasMore);
  };

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 rounded-xl border border-border p-4 lg:p-5 h-fit lg:sticky lg:top-17">
      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-3">Categories</h3>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap lg:flex-col gap-2">
          {categories.map((c, index) => (
            <button
              key={index}
              onClick={() => handleCategoryChange(c.name)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition text-center sm:text-left
                ${
                  category === c.name
                    ? "bg-[var(--primary)] text-white"
                    : "bg-[var(--background)] hover:bg-[var(--primary-hover)]"
                }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Sort By</h3>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400 hidden sm:block" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm"
          >
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
            <option value="Popular">Most Popular</option>
          </select>
        </div>
      </div>
    </aside>
  );
}
