"use client";
import React from "react";
import onAction from "@/utils/admin/onAction";

export default function HeadingSelector({ headingLevel, setHeadingLevel, editor }) {
    const handleHeadingChange = (e) => {
        const value = e.target.value;
        setHeadingLevel(value);
        onAction("heading", value, editor);
    };

    return (
        <select
            value={headingLevel}
            onChange={handleHeadingChange}
            className="border rounded px-2 py-1 bg-background text-foreground"
        >
            <option>Normal</option>
            <option>H1</option>
            <option>H2</option>
            <option>H3</option>
            <option>H4</option>
            <option>p</option>
        </select>
    );
}
