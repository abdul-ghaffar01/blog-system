import Image from 'next/image';
import React from 'react'

const ImageBlock = ({ item }) => {
    return (
        <Image
            src={item.src}
            alt={item.alt || ""}
            width={800}
            height={400}
            className={item.styles?.join(" ")}
        />
    );
}

export default ImageBlock