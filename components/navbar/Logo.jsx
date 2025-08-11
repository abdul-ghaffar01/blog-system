"use client"
import { motion } from "framer-motion"
import ClientOnly from "../ClientOnly"

const Logo = ({ startDelay }) => {
    return (
        <ClientOnly>

            <motion.div
                className="relative w-[50px] h-[50px] flex items-center justify-center"
            >
                {/* Lines */}
                <div className="absolute top-0 w-full h-full">
                    {/* Top Line */}
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%", transition: { duration: 0.3, delay: startDelay || 0.8 } }}
                        viewport={{ once: true }}
                        className="absolute top-0 left-0 h-[4px] bg-gradient-to-r from-blue-500 to-purple-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                    ></motion.div>

                    {/* Right Line */}
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%", transition: { duration: 0.3, delay: 1.0 } }}
                        viewport={{ once: true }}
                        className="absolute right-0 top-0 w-[4px] bg-gradient-to-b from-purple-500 to-blue-500 shadow-[0_0_8px_rgba(147,51,234,0.6)]"
                    ></motion.div>

                    {/* Bottom Line */}
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%", transition: { duration: 0.3, delay: 1.2 } }}
                        viewport={{ once: true }}
                        className="absolute bottom-0 right-0 h-[4px] bg-gradient-to-r from-blue-500 to-purple-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                    ></motion.div>

                    {/* Left Line */}
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%", transition: { duration: 0.3, delay: 1.4 } }}
                        viewport={{ once: true }}
                        className="absolute left-0 bottom-0 w-[4px] bg-gradient-to-b from-purple-500 to-blue-500 shadow-[0_0_8px_rgba(147,51,234,0.6)]"
                    ></motion.div>
                </div>

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1, transition: { duration: 0.4, delay: 1.6 } }}
                    viewport={{ once: true }}
                    className="absolute text-xl font-extrabold text-foreground tracking-widest"
                >
                    AG
                </motion.div>
            </motion.div>
        </ClientOnly>
    )
}

export default Logo