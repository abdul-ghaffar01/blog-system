
import readChildren from '@/utils/readChildren';
import React from 'react'

const Box = ({ item }) => {
    return (
        <div className={item.styles?.join(" ")}>
            {readChildren(item.children)}
        </div>
    );
}

export default Box