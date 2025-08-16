"use client";
import React, { useRef, useEffect } from "react";
import useAdminStore from "@/stores/useAdminStore";
import renderElements from "./RenderElementsInTagsPanel";
import Loader from "../Loader";
import { RefreshCcw } from "lucide-react";
import updateTagsPanel from "@/utils/admin/updateTagsPanel";

const TagsSetting = () => {
  const { elements, selectedItem, setSelectedItem, elementsLoading } = useAdminStore();
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

  const refreshElements = () => {
    updateTagsPanel();
  }

  return (
    <div className="w-full h-full overflow-y-auto bg-background pb-25">
      <div className="flex justify-between items-center p-2">
        <h2 className="text-lg font-semibold bg-background select-none">Elements</h2>
        <div className="flex gap-2">
          {elementsLoading && <Loader />}
          <button title="Reload" onClick={refreshElements}>
            <RefreshCcw size={16} className="text-muted hover:text-foreground" />
          </button>

        </div>
      </div>
      <div className="p-2 -[-5]">
        {renderElements(elements, selectedItem, setSelectedItem, refsMap, 0)}
      </div>
    </div>
  );
};

export default TagsSetting;
