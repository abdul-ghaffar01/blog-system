"use client";
import React from "react";
import { X, Search } from "lucide-react";

const SearchBox = ({ query, setQuery }) => {
  return (
    <div className="relative w-full max-w-sm">
      {/* Search Icon */}
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />

      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-full pl-10 pr-10 py-2 rounded-md outline-none bg-surface text-foreground placeholder-muted-foreground transition"
      />

      {/* Clear Icon */}
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBox;
