import readChildren from '@/utils/readChildren';
import React from 'react'

const Quote = ({ item }) => {
    return (
        <blockquote className={item.styles?.join(" ")}>
            “{readChildren(item.children)}”
            {item.author && (
                <footer className="mt-2">— {item.author}</footer>
            )}
        </blockquote>
    );
}

export default Quote