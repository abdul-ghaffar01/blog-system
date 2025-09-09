import React from 'react'
import { motion } from "framer-motion"
const MotionedDiv = ({children}) => {
    return (
        <motion.div >{children}</motion.div>
    )
}

export default MotionedDiv