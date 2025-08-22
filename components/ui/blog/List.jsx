import readChildren from "@/utils/readChildren";
import React from "react";

const List = ({ item }) => {
    const ListTag = item.list_type === "ordered" ? "ol" : "ul";

    // Base classes
    const baseClasses = "list-inside space-y-2 text-foreground";

    // Default list style depending on type
    const defaultListClass = ListTag === "ol" ? "list-decimal" : "list-disc";

    // Combine everything
    const classes = [
        item.styles?.join(" ") || "",
        defaultListClass,
        baseClasses,
    ].join(" ");

    return (
        <ListTag className={classes}>
            {item.children.map((listItem, idx) => (
                <li key={idx}>{readChildren(listItem)}</li>
            ))}
        </ListTag>
    );
};

export default List;
