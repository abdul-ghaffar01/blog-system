"use client";
import React from "react";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import onAction from "@/utils/admin/onAction";
import useAdminStore from "@/stores/useAdminStore";
import updatePreview from "@/utils/admin/updatePreview";

export default function AlignButtons() {
  const { selectedItem } = useAdminStore();

  const handleAlignChange = (alignment) => {
    if (!selectedItem) return;

    // Remove any existing text alignment classes first
    selectedItem.classList.remove("text-left", "text-center", "text-right", "text-justify");

    // Add the new alignment class
    selectedItem.classList.add(`text-${alignment}`);
    updatePreview();
  };


  return (
    <>
      <button onClick={() => handleAlignChange("left")} title="Align Left" className="p-2 hover:bg-background rounded transition">
        <AlignLeft size={18} />
      </button>
      <button onClick={() => handleAlignChange("center")} title="Align Center" className="p-2 hover:bg-background rounded transition">
        <AlignCenter size={18} />
      </button>
      <button onClick={() => handleAlignChange("right")} title="Align Right" className="p-2 hover:bg-background rounded transition">
        <AlignRight size={18} />
      </button>
    </>
  );
}
