import readChildren from '@/utils/readChildren';
import React from 'react'

const List = ({ item }) => {
    const ListTag = item.list_type === "ordered" ? "ol" : "ul";
    return (
        <ListTag className={item.styles?.join(" ")}>
            {item.items.map((listItem, idx) => (
                <li key={idx}>{readChildren(item.children)}</li>
            ))}
        </ListTag>
    );
}

export default List