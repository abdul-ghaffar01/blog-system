"use client"
import readChildren from '@/utils/readChildren';
import Link from 'next/link';

const LinkBlock = ({ item }) => {
    
    return (
        <Link href={item.href} target={item.target} className={item.styles?.join(" ")}>
            {readChildren(item.children)}
        </Link>
    );
}

export default LinkBlock