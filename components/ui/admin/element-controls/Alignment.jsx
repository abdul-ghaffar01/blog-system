"use client";

import updatePanels from "@/utils/admin/updatePanels";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify, Image as ImageIcon } from "lucide-react";

const Alignment = ({ el }) => {
    const isImage = el.elem.tagName?.toLowerCase() === "img";

    const setAlignment = (type) => {
        if (!el) return;

        // Remove old alignment classes
        el.elem.classList.remove(
            "text-left",
            "text-center",
            "text-right",
            "text-justify",
            "mx-auto",
            "float-left",
            "float-right"
        );

        console.log(isImage);
        // Add new one
        if (isImage) {
            if (type === "left") el.elem.classList.add("float-left");
            if (type === "center") el.elem.classList.add("mx-auto", "block"); // mx-auto needs block
            if (type === "right") el.elem.classList.add("float-right");
        } else {
            if (type === "left") el.elem.classList.add("text-left");
            if (type === "center") el.elem.classList.add("text-center");
            if (type === "right") el.elem.classList.add("text-right");
            if (type === "justify") el.elem.classList.add("text-justify");
        }

        updatePanels();
    };

    return (
        <div className="space-y-2">
            <h3 className="text-sm text-muted select-none">
                Alignment {isImage && <ImageIcon size={14} className="inline ml-1" />}
            </h3>
            <div className="flex gap-2">
                <button
                    onClick={() => setAlignment("left")}
                    className="p-2 rounded bg-surface hover:opacity-70"
                >
                    <AlignLeft size={16} />
                </button>
                <button
                    onClick={() => setAlignment("center")}
                    className="p-2 rounded bg-surface hover:opacity-70"
                >
                    <AlignCenter size={16} />
                </button>
                <button
                    onClick={() => setAlignment("right")}
                    className="p-2 rounded bg-surface hover:opacity-70"
                >
                    <AlignRight size={16} />
                </button>
                {!isImage && (
                    <button
                        onClick={() => setAlignment("justify")}
                        className="p-2 rounded bg-surface hover:opacity-70"
                    >
                        <AlignJustify size={16} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Alignment;
