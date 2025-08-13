import Link from 'next/link';
import React from 'react'

const LinkBlock = ({item}) => {
  return (
        <Link href={item.href} className={item.styles?.join(" ")}>
            {item.text}
        </Link>
    );
}

export default LinkBlock