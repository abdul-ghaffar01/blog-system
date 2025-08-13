import React from 'react'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
const Code = ({ item }) => {
    return (
        <SyntaxHighlighter
            language={item.language}
            style={oneDark}
            showLineNumbers
            wrapLongLines
        >
            {item.code}
        </SyntaxHighlighter>
        // <pre className={item.styles?.join(" ")}>
        //     <code className={`language-${item.language}`}>
        //         {item.code}
        //     </code>
        // </pre>
    );
}

export default Code