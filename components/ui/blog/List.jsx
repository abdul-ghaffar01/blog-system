import React from 'react'

const List = ({item}) => {
    const ListTag = item.list_type === "ordered" ? "ol" : "ul";
    return (
        <ListTag className={item.styles?.join(" ")}>
            {item.children.map((listItem, idx) => (
                <li key={idx}>{listItem}</li>
            ))}
        </ListTag>
    );
}

export default List