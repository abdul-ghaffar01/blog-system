// components/ui/blog/Heading.jsx
import React from "react";

export default function Heading({ item }) {
    const Tag = `h${item.level}`;
    return (
        <Tag className={item.styles?.join(" ")}>
            {item.text}
        </Tag>
    );
}
