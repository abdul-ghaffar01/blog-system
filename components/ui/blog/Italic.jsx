import readChildren from '@/utils/readChildren';
import React from 'react'

const Italic = ({ item }) => {
    return (
        <em className={item.styles?.join(" ")}>
            {readChildren(item.children)}
        </em>
    );
}

export default Italic