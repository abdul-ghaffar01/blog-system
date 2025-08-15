"use client";
import React from "react";
import useAdminStore from "@/stores/useAdminStore";
import renderElements from "./RenderElementsInTagsPanel";

const TagsSetting = () => {
  const { elements, selectedItem, setSelectedItem } = useAdminStore();

  return (
    <div className="w-full h-full overflow-y-auto bg-background">
      <h2 className="text-lg font-semibold p-2 bg-background">Elements</h2>
      <div className="p-2">{renderElements(elements, selectedItem, setSelectedItem)}</div>
    </div>
  );
};

export default TagsSetting;
