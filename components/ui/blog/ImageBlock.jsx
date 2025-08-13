import Image from 'next/image';
import React from 'react'

const ImageBlock = ({item}) => {
  return (
        <div className={item.styles?.join(" ")}>
            <Image
                src={item.src}
                alt={item.alt || ""}
                width={800}
                height={400}
                className="w-full h-auto"
            />
        </div>
    );
}

export default ImageBlock