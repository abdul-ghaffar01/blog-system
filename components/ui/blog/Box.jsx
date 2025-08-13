import getItem from '@/utils/getItem';
import React from 'react'

const Box = ({item}) => {
    return (
        <div className={item.styles?.join(" ")}>
            {item.items?.map((child, idx) => (
                <React.Fragment key={idx}>
                    {getItem(child)}
                </React.Fragment>
            ))}
        </div>
    );
}

export default Box