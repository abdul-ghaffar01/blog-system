import readChildren from '@/utils/readChildren';
import React from 'react'

const Bold = ({item}) => {
  return (
        <b className={item.styles?.join(" ")}>
            {readChildren(item.children)}
        </b>
    );
}

export default Bold