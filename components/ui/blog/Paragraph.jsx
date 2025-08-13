import React from 'react'

const Paragraph = ({item}) => {
  return (
        <p className={item.styles?.join(" ")}>
            {item.text}
        </p>
    );
}

export default Paragraph