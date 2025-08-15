// components/ui/blog/Heading.jsx
"use client"
import readChildren from "@/utils/readChildren";
import React, { useEffect, useRef } from "react";

export default function Heading({ item }) {
    const Tag = `h${item.level}`;
    return (
        <Tag className={item.styles?.join(" ")}>
            {readChildren(item.children)}
        </Tag>
    );
}
