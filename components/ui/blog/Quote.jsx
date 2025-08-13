import React from 'react'

const Quote = ({ item }) => {
    return (
        <blockquote className={item.styles?.join(" ")}>
            “{item.text}”
            {item.author && (
                <footer className="mt-2">— {item.author}</footer>
            )}
        </blockquote>
    );
}

export default Quote