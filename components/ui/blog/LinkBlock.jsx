"use client"
import Link from 'next/link';
import React, { useEffect, useRef } from 'react'

const LinkBlock = ({ item }) => {
    const linkRef = useRef(null);
    useEffect(() => {
        // this is because I will style heading like bold or something
        linkRef.current.innerHTML = item.text
    }, [item.text])
    return (
        <Link ref={linkRef} href={item.href} target={item.target} className={item.styles?.join(" ")}>
            {item.text}
        </Link>
    );
}

export default LinkBlock