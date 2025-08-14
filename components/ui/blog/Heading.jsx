// components/ui/blog/Heading.jsx
"use client"
import React, { useEffect, useRef } from "react";

export default function Heading({ item }) {
    const headingRef = useRef(null);
    useEffect(() => {
        // this is because I will style heading like bold or something
        headingRef.current.innerHTML = item.text
    }, [item.text])
    const Tag = `h${item.level}`;
    return (
        <Tag ref={headingRef} className={item.styles?.join(" ")}>
            {item.text}
        </Tag>
    );
}
