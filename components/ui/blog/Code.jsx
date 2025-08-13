import React from 'react'

const Code = ({item}) => {
  return (
        <pre className={item.styles?.join(" ")}>
            <code className={`language-${item.language}`}>
                {item.code}
            </code>
        </pre>
    );
}

export default Code