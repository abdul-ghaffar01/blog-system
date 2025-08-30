import Navbar from '@/components/navbar/Navbar'
import React from 'react'

const layout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default layout