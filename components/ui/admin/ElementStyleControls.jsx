"use client";
import React from "react";
import useAdminStore from "@/stores/useAdminStore";

const ElementStyleControls = ({ elementIndex }) => {
    const { elements, updateElementStyle } = useAdminStore();
    const el = elements[elementIndex];

    return (
        <div className="space-y-2 bg-background">
            {/* Color */}
            <div>
                <label className="block text-sm mb-1">Color</label>
                <input
                    type="color"
                    className="w-full h-8 border rounded"
                    value={el.styles?.color || "#000000"}
                    onChange={(e) =>
                        updateElementStyle(elementIndex, "color", e.target.value)
                    }
                />
            </div>

            {/* Font Size */}
            <div>
                <label className="block text-sm mb-1">Font Size</label>
                <input
                    type="text"
                    placeholder="e.g. 16px"
                    className="w-full border rounded px-2 py-1"
                    value={el.styles?.fontSize || ""}
                    onChange={(e) =>
                        updateElementStyle(elementIndex, "fontSize", e.target.value)
                    }
                />
            </div>

            {/* Background */}
            <div>
                <label className="block text-sm mb-1">Background</label>
                <input
                    type="color"
                    className="w-full h-8 border rounded"
                    value={el.styles?.backgroundColor || "#ffffff"}
                    onChange={(e) =>
                        updateElementStyle(elementIndex, "backgroundColor", e.target.value)
                    }
                />
            </div>
        </div>
    );
};

export default ElementStyleControls;
