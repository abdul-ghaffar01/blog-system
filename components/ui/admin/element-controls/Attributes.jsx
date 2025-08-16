import React, { useState } from "react";

const Attributes = ({ el }) => {
    if (!el || !el.elem) return null;

    const node = el.elem;

    // Filter attributes based on tag type
    const getInitialAttributes = () => {
        switch (node.tagName) {
            case "A":
                return {
                    href: node.getAttribute("href") || "",
                    text: node.textContent.trim() || "",
                };
            case "IMG":
                return {
                    src: node.getAttribute("src") || "",
                    alt: node.getAttribute("alt") || "",
                };
            case "INPUT":
                return {
                    type: node.getAttribute("type") || "",
                    value: node.value || "",
                };
            default:
                return {
                    text: node.textContent.trim() || "",
                };
        }
    };

    const [attributes, setAttributes] = useState(getInitialAttributes);

    const handleChange = (key, value) => {
        setAttributes((prev) => ({ ...prev, [key]: value }));

        // Apply changes directly to the DOM element
        if (key === "href" && node.tagName === "A") node.setAttribute("href", value);
        if (key === "src" && node.tagName === "IMG") node.setAttribute("src", value);
        if (key === "alt" && node.tagName === "IMG") node.setAttribute("alt", value);
        if (key === "type" && node.tagName === "INPUT") node.setAttribute("type", value);
        if (key === "value" && node.tagName === "INPUT") node.value = value;
        if (key === "text" && node.tagName !== "IMG") node.textContent = value;
    };

    return (
        <div className="bg-surface rounded-md space-y-1 text-sm">
            <h3 className="text-muted text-sm mb-1">Attributes</h3>
            {Object.entries(attributes).map(([key, value]) =>
                value !== null ? (
                    <div key={key} className="flex items-center gap-2">
                        <span className="text-muted w-10">{key}:</span>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className="flex-1 bg-background rounded px-2 py-1 text-foreground text-sm focus:outline-none"
                        />
                    </div>
                ) : null
            )}
        </div>
    );
};

export default Attributes;
