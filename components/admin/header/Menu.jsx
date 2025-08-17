import React from 'react'

const Menu = () => {
    return (
        <div className='w-full h-fit bg-background p-2'>
            <ul className='flex gap-2 text-muted'>
                <li className='text-sm hover:bg-surface hover:text-foreground p-1 px-2 rounded-md cursor-pointer'>Controls</li>
                <li className='text-sm hover:bg-surface hover:text-foreground p-1 px-2 rounded-md cursor-pointer'>view</li>
            </ul>
        </div>
    )
}

export default Menu