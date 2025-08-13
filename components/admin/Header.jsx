"use client";
import React, { useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Code,
  Link,
  Image,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
} from "lucide-react";

const AdminHeader = ({ onAction }) => {
  const [headingLevel, setHeadingLevel] = useState("Normal");
  const [align, setAlign] = useState("left");

  const handleHeadingChange = (e) => {
    const value = e.target.value;
    setHeadingLevel(value);
    onAction("heading", value);
  };

  const handleAlignChange = (alignment) => {
    setAlign(alignment);
    onAction("align", alignment);
  };

  return (
    <div className="flex flex-col md:flex-row sticky top-0 items-center justify-between p-3 shadow-md bg-surface">
      {/* Left section: Heading + formatting */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Heading dropdown */}
        <select
          value={headingLevel}
          onChange={handleHeadingChange}
          className="border rounded px-2 py-1 bg-background text-foreground"
        >
          <option>Normal</option>
          <option>H1</option>
          <option>H2</option>
          <option>H3</option>
          <option>H4</option>
        </select>

        {/* Basic formatting */}
        <button onClick={() => onAction("bold")} title="Bold" className="p-2 hover:bg-background rounded transition">
          <Bold size={18} />
        </button>
        <button onClick={() => onAction("italic")} title="Italic" className="p-2 hover:bg-background rounded transition">
          <Italic size={18} />
        </button>
        <button onClick={() => onAction("underline")} title="Underline" className="p-2 hover:bg-background rounded transition">
          <Underline size={18} />
        </button>
        <button onClick={() => onAction("code")} title="Code" className="p-2 hover:bg-background rounded transition">
          <Code size={18} />
        </button>

        {/* Links & Images */}
        <button onClick={() => onAction("link")} title="Add Link" className="p-2 hover:bg-background rounded transition">
          <Link size={18} />
        </button>
        <button onClick={() => onAction("image")} title="Add Image" className="p-2 hover:bg-background rounded transition">
          <Image size={18} />
        </button>

        {/* Lists */}
        <button onClick={() => onAction("unordered-list")} title="Bullet List" className="p-2 hover:bg-background rounded transition">
          <List size={18} />
        </button>
        <button onClick={() => onAction("ordered-list")} title="Numbered List" className="p-2 hover:bg-background rounded transition">
          <ListOrdered size={18} />
        </button>

        {/* Alignment */}
        <button onClick={() => handleAlignChange("left")} title="Align Left" className="p-2 hover:bg-background rounded transition">
          <AlignLeft size={18} />
        </button>
        <button onClick={() => handleAlignChange("center")} title="Align Center" className="p-2 hover:bg-background rounded transition">
          <AlignCenter size={18} />
        </button>
        <button onClick={() => handleAlignChange("right")} title="Align Right" className="p-2 hover:bg-background rounded transition">
          <AlignRight size={18} />
        </button>
      </div>

      {/* Right section: Undo / Redo / Publish */}
      <div className="flex items-center gap-2 mt-2 md:mt-0">
        <button onClick={() => onAction("undo")} title="Undo" className="p-2 hover:bg-background rounded transition">
          <Undo size={18} />
        </button>
        <button onClick={() => onAction("redo")} title="Redo" className="p-2 hover:bg-background rounded transition">
          <Redo size={18} />
        </button>
        <button onClick={() => onAction("save")} className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark transition">
          Save
        </button>
        <button onClick={() => onAction("publish")} className="px-4 py-2 rounded bg-success text-white hover:bg-success-dark transition">
          Publish
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;
