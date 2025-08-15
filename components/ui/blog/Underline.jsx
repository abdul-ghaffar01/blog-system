import readChildren from '@/utils/readChildren';
import React from 'react'

const Underline = ({ item }) => {
    return (
        <u className={item.styles?.join(" ")}>
            {readChildren(item.children)}
        </u>
    );
}

export default Underline