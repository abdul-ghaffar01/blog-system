"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import useAdminStore from "@/stores/useAdminStore";
import Button from "../Button";
import updatePreview from "@/utils/admin/updatePreview";
import updateTagsPanel from "@/utils/admin/updateTagsPanel";

const ElementStyleControls = ({ elementIndex }) => {
  const [tailwindClass, setTailwindClass] = useState("");
  const { elements } = useAdminStore();
  const el = elements[elementIndex];

  const removeThisItem = () => {
    if (!el) return;
    el.elem.remove();
    updatePreview();
    updateTagsPanel();
  };

  const addClass = (e) => {
    e.preventDefault();
    if (!el || !tailwindClass.trim()) return;

    el.elem.classList.add(tailwindClass.trim());
    setTailwindClass("");
    updatePreview();
    updateTagsPanel();
  };

  const removeClass = (cls) => {
    if (!el) return;
    el.elem.classList.remove(cls);
    updatePreview();
    updateTagsPanel();
  };

  return (
    <div className="space-y-2 bg-background p-2 rounded">
      {/* Button to remove item */}
      <div className="w-full">
        <Button variant="danger" onClick={removeThisItem} className="w-full text-sm">
          Remove element
        </Button>
      </div>

      {/* Add new class */}
      <div className="mt-3">
        <h1 className="text-muted text-sm mb-1">Add classes</h1>
        <form onSubmit={addClass} className="flex gap-2">
          <input
            className="p-2 border-border bg-surface w-full rounded text-sm outline-none"
            onChange={(e) => setTailwindClass(e.target.value)}
            value={tailwindClass}
            type="text"
            placeholder="Type any Tailwind class"
          />
          <Button variant="success" className="text-sm">Add</Button>
        </form>
      </div>

      {/* Existing classes */}
      <div className="flex flex-wrap gap-2 mt-2">
        {[...el.elem.classList].map((cls) => (
          <div
            key={cls}
            className="flex items-center gap-1 bg-surface border border-border px-2 py-1 rounded"
          >
            <span className="text-sm text-foreground">{cls}</span>
            <button onClick={() => removeClass(cls)} type="button">
              <X size={14} className="text-danger hover:text-danger-hover" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElementStyleControls;
