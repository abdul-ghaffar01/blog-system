"use client";
import React from "react";
import { X, Search } from "lucide-react";

const SearchBox = ({ query, setQuery }) => {
  return (
    <div className="w-full flex">

      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-full pl-2 pr-10 py-2 rounded-md outline-none bg-background text-foreground placeholder-muted transition"
      />

    </div>
  );
};

export default SearchBox;
