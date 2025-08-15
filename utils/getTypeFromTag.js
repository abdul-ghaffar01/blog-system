// getTypeFromTag.js
export default function getTypeFromTag(tag) {
    tag = tag?.toLowerCase?.();
    if (!tag) return null;

    if (tag.startsWith("h")) return { type: "heading", level: Number(tag.replace("h", "")) };
    if (tag === "b" || tag === "strong") return { type: "bold" };
    if (tag === "i" || tag === "em") return { type: "italic" };
    if (tag === "u") return { type: "underline" };
    if (tag === "p") return { type: "paragraph" };
    if (tag === "img") return { type: "image" };
    if (tag === "pre") return { type: "code" };
    if (tag === "blockquote") return { type: "quote" };
    if (tag === "ul" || tag === "ol") return { type: "list", list_type: tag === "ul" ? "unordered" : "ordered" };
    if (tag === "a") return { type: "link" };
    if (tag === "table") return { type: "table" };

    return { type: tag }; // fallback
}
