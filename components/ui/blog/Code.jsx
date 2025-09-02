"use client"
import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Clipboard, Check } from "lucide-react";

const Code = ({ item }) => {
    const [copied, setCopied] = useState(false);

    // checking what is coming in item
    useEffect(() => {
        console.log(item);
    }, [item]);

    const handleCopy = () => {
        navigator.clipboard.writeText(item.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // reset after 2 seconds
    };

    return (
        <div className="relative my-4 rounded-lg overflow-hidden shadow">
            <button
                onClick={handleCopy}
                className="absolute z-2 top-2 right-2 flex text-sm items-center gap-1 bg-surface text-foreground px-2 py-1 rounded shadow hover:bg-background hover:text-foreground transition"
            >
                {copied ? <Check size={16} /> : <Clipboard size={16} />}
                {copied ? "Copied" : "Copy"}
            </button>
            <SyntaxHighlighter
                language={item.language}
                style={oneDark}
                showLineNumbers
                wrapLongLines
                customStyle={{ margin: 0, borderRadius: "0.5rem" }}
            >
                {item.code}
            </SyntaxHighlighter>
        </div>
    );
};

export default Code;

