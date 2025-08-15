"use client";
import React, { useRef, useEffect } from "react";
import useAdminStore from "@/stores/useAdminStore";
import renderElements from "./RenderElementsInTagsPanel";

const TagsSetting = () => {
  const { elements, selectedItem, setSelectedItem } = useAdminStore();
  const refsMap = useRef({});

  // Scroll when selected changes
  useEffect(() => {
    if (selectedItem?.id && refsMap.current[selectedItem.id]) {
      const node = refsMap.current[selectedItem.id];
      const rect = node.getBoundingClientRect();
      const inView =
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);

      if (!inView) {
        node.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [selectedItem]);

  return (
    <div className="w-full h-full overflow-y-auto bg-background pb-25">
      <h2 className="text-lg font-semibold p-2 bg-background">Elements</h2>
      <div className="p-2">
        {renderElements(elements, selectedItem, setSelectedItem, refsMap, 0)}
      </div>
    </div>
  );
};

export default TagsSetting;
