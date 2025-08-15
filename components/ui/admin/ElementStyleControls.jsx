"use client";
import React, { useEffect, useState } from "react";
import { X, ArrowUp, ArrowDown } from "lucide-react";
import Button from "../Button";
import updatePreview from "@/utils/admin/updatePreview";
import updateTagsPanel from "@/utils/admin/updateTagsPanel";

const ElementStyleControls = ({ el }) => {
  const [tailwindClass, setTailwindClass] = useState("");

  const removeThisItem = () => {
    if (!el) return;
    el.elem.remove();
    updatePreview();
    updateTagsPanel();
  };

  const moveUp = () => {
    if (!el || !el.elem.previousElementSibling) return;
    const parent = el.elem.parentNode;
    parent.insertBefore(el.elem, el.elem.previousElementSibling);
    updatePreview();
    updateTagsPanel();
  };

  const moveDown = () => {
    if (!el || !el.elem.nextElementSibling) return;
    const parent = el.elem.parentNode;
    parent.insertBefore(el.elem.nextElementSibling, el.elem);
    updatePreview();
    updateTagsPanel();
  };

  const addClass = (e) => {
    e.preventDefault();
    if (!el || !tailwindClass.trim()) return;

    const classesToAdd = tailwindClass
      .trim()
      .split(/\s+/)
      .filter((c) => c);

    classesToAdd.forEach((cls) => el.elem.classList.add(cls));
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
      {/* Buttons: Remove, Up, Down */}
      <div className="flex gap-2 w-full">
        <Button variant="danger" onClick={removeThisItem} className="flex-1 text-sm">
          Remove
        </Button>
        <Button variant="secondary" onClick={moveUp} className="flex-none text-sm">
          <ArrowUp size={16} className="text-foreground" />
        </Button>
        <Button variant="secondary" onClick={moveDown} className="flex-none text-sm">
          <ArrowDown size={16} className="text-foreground" />
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
        {el?.elem ? (
          [...el.elem.classList].map((cls) => (
            <div
              key={cls}
              className="flex items-center gap-1 bg-surface border border-border px-2 py-1 rounded"
            >
              <span className="text-sm text-foreground">{cls}</span>
              <button onClick={() => removeClass(cls)} type="button">
                <X size={14} className="text-danger hover:text-danger-hover" />
              </button>
            </div>
          ))
        ) : (
          <span className="text-xs text-muted">No classes</span>
        )}
      </div>

    </div>
  );
};

export default ElementStyleControls;
