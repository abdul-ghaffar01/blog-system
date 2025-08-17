"use client";
import React, { useState } from "react";
import onAction from "@/utils/admin/onAction";

export default function HeadingSelector() {
    const [headingLevel, setHeadingLevel] = useState("");

    const handleHeadingChange = (e) => {
        const value = e.target.value; // this is the actual tag value
        if (value !== "heading") {
            onAction("heading", value);   // pass the tag
            setHeadingLevel("heading");   // reset to default display
        }

    };

    return (
        <select
            value={headingLevel}
            onChange={handleHeadingChange}
            className="border border-border outline-none rounded p-2 bg-background text-foreground"
        >
            <option value="heading">Heading</option>
            <option value="h1">H1</option>
            <option value="h2">H2</option>
            <option value="h3">H3</option>
            <option value="h4">H4</option>
            <option value="p">p</option>
        </select>
    );
}
